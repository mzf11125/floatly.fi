/*
/// Module: floatly_fi
module floatly_fi::floatly_fi;
*/

// For Move coding conventions, see
// https://docs.iota.org/developer/iota-101/move-overview/conventions


// Floatly Lending Protocol - Move Smart Contracts for IOTA
// Version 1.0 - MVP Implementation

module floatly_fi::lending_protocol {
    use std::string::String;
    // use iota::tx_context::TxContext;
    use iota::coin::{Self, Coin};
    use iota::balance::{Self, Balance};
    use iota::clock::{Self, Clock};
    use iota::event;
    use iota::table::{Self, Table};

    // ==================== Error Codes ====================
    const E_LOAN_NOT_ACTIVE: u64 = 2;
    const E_UNAUTHORIZED: u64 = 3;
    const E_INVALID_AMOUNT: u64 = 5;
    const E_POOL_INSUFFICIENT_LIQUIDITY: u64 = 7;
    const E_MINIMUM_DEPOSIT_NOT_MET: u64 = 8;
    const E_WITHDRAWAL_LOCKED: u64 = 9;
    const E_INVALID_TERMS: u64 = 10;

    // ==================== Constants ====================
    const MINIMUM_POOL_DEPOSIT: u64 = 1_000_000_000; // 1,000 USDC (6 decimals)
    const WITHDRAWAL_NOTICE_PERIOD: u64 = 604800000; // 7 days in milliseconds
    const INSURANCE_POOL_PERCENTAGE: u64 = 10; // 10% of fees go to insurance
    const BASIS_POINTS: u64 = 10000; // For percentage calculations

    // ==================== Structs ====================

    /// Platform configuration and admin controls
    public struct PlatformConfig<phantom USDC> has key {
        id: UID,
        admin: address,
        paused: bool,
        total_loans_issued: u64,
        total_volume: u64,
        total_defaults: u64,
        insurance_pool: Balance<USDC>,
        platform_fees_collected: Balance<USDC>,
    }

    /// Liquidity Pool for a specific region/risk tier
    public struct LiquidityPool<phantom USDC> has key {
        id: UID,
        name: String,
        geographic_focus: String, // e.g., "Indonesia", "Philippines"
        risk_tier: u8, // 1=Conservative, 2=Balanced, 3=Aggressive
        total_deposited: u64,
        total_deployed: u64,
        available_liquidity: Balance<USDC>,
        expected_apy: u64, // In basis points (e.g., 1200 = 12%)
        active_loans: vector<ID>,
        liquidity_providers: Table<address, LPPosition>,
        creation_time: u64,
    }

    /// Individual LP position in a pool
    public struct LPPosition has store, drop {
        deposited_amount: u64,
        shares: u64,
        earnings_claimed: u64,
        deposit_time: u64,
        withdrawal_request_time: u64, // 0 if no pending withdrawal
    }

    /// Individual loan contract
    public struct Loan has key {
        id: UID,
        merchant: address,
        pool_id: ID,
        principal: u64,
        fee_amount: u64, // Total fee (not APY, flat fee)
        total_repayment: u64, // principal + fee
        amount_repaid: u64,
        disbursement_time: u64,
        maturity_time: u64,
        status: u8, // 0=Active, 1=Repaid, 2=Defaulted, 3=Restructured
        merchant_tier: u8, // 1=New, 2=Proven, 3=VIP
        payment_history: vector<Payment>,
        late_days: u64,
    }

    /// Payment record
    public struct Payment has store, drop, copy {
        amount: u64,
        timestamp: u64,
        is_late: bool,
    }

    /// On-chain credit score (NFT-based)
    public struct CreditScore has key {
        id: UID,
        merchant: address,
        score: u64, // 300-850 scale
        total_loans: u64,
        successful_loans: u64,
        total_borrowed: u64,
        total_repaid: u64,
        current_tier: u8,
        last_updated: u64,
    }

    /// LP receipt token (represents pool shares)
    public struct LPToken has key, store {
        id: UID,
        pool_id: ID,
        shares: u64,
        owner: address,
    }

    // ==================== Events ====================

    public struct LoanCreatedEvent has copy, drop {
        loan_id: ID,
        merchant: address,
        pool_id: ID,
        principal: u64,
        total_repayment: u64,
        maturity_time: u64,
    }

    public struct LoanRepaidEvent has copy, drop {
        loan_id: ID,
        merchant: address,
        amount: u64,
        remaining: u64,
        is_full_repayment: bool,
    }

    public struct LoanDefaultedEvent has copy, drop {
        loan_id: ID,
        merchant: address,
        principal: u64,
        amount_unpaid: u64,
    }

    public struct LiquidityDepositedEvent has copy, drop {
        pool_id: ID,
        lp_address: address,
        amount: u64,
        shares_issued: u64,
    }

    public struct LiquidityWithdrawnEvent has copy, drop {
        pool_id: ID,
        lp_address: address,
        amount: u64,
        earnings: u64,
    }

    public struct CreditScoreUpdatedEvent has copy, drop {
        merchant: address,
        old_score: u64,
        new_score: u64,
        new_tier: u8,
    }

    // ==================== Admin Functions ====================

    /// Initialize the platform (called once on deployment)
    /// Note: The USDC token has its own init function in the usdc module
    /// This creates a platform config that works with any coin type
    fun init(ctx: &mut TxContext) {
        // Platform will be instantiated with specific coin types when used
        // This is a placeholder init for module initialization
    }

    /// Create a new liquidity pool
    public entry fun create_liquidity_pool<USDC>(
        config: &mut PlatformConfig<USDC>,
        name: String,
        geographic_focus: String,
        risk_tier: u8,
        expected_apy: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, E_UNAUTHORIZED);
        assert!(risk_tier >= 1 && risk_tier <= 3, E_INVALID_TERMS);

        let pool = LiquidityPool<USDC> {
            id: object::new(ctx),
            name,
            geographic_focus,
            risk_tier,
            total_deposited: 0,
            total_deployed: 0,
            available_liquidity: balance::zero(),
            expected_apy,
            active_loans: vector::empty(),
            liquidity_providers: table::new(ctx),
            creation_time: clock::timestamp_ms(clock),
        };

        transfer::share_object(pool);
    }

    /// Pause/unpause the platform
    public entry fun set_paused<USDC>(
        config: &mut PlatformConfig<USDC>,
        paused: bool,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, E_UNAUTHORIZED);
        config.paused = paused;
    }

    // ==================== Liquidity Provider Functions ====================

    /// Deposit stablecoins into a liquidity pool
    public entry fun deposit_liquidity<USDC>(
        pool: &mut LiquidityPool<USDC>,
        payment: Coin<USDC>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        assert!(amount >= MINIMUM_POOL_DEPOSIT, E_MINIMUM_DEPOSIT_NOT_MET);

        let lp_address = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);

        // Calculate shares (proportional to pool value)
        let shares = if (pool.total_deposited == 0) {
            amount // First depositor gets 1:1 shares
        } else {
            (amount * pool.total_deposited) / (balance::value(&pool.available_liquidity) + pool.total_deployed)
        };

        // Add to pool
        let coin_balance = coin::into_balance(payment);
        balance::join(&mut pool.available_liquidity, coin_balance);
        pool.total_deposited = pool.total_deposited + amount;

        // Update or create LP position
        if (table::contains(&pool.liquidity_providers, lp_address)) {
            let position = table::borrow_mut(&mut pool.liquidity_providers, lp_address);
            position.deposited_amount = position.deposited_amount + amount;
            position.shares = position.shares + shares;
        } else {
            let position = LPPosition {
                deposited_amount: amount,
                shares,
                earnings_claimed: 0,
                deposit_time: current_time,
                withdrawal_request_time: 0,
            };
            table::add(&mut pool.liquidity_providers, lp_address, position);
        };

        event::emit(LiquidityDepositedEvent {
            pool_id: object::uid_to_inner(&pool.id),
            lp_address,
            amount,
            shares_issued: shares,
        });
    }

    /// Request withdrawal (starts 7-day notice period)
    public entry fun request_withdrawal<USDC>(
        pool: &mut LiquidityPool<USDC>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let lp_address = tx_context::sender(ctx);
        assert!(table::contains(&pool.liquidity_providers, lp_address), E_UNAUTHORIZED);

        let position = table::borrow_mut(&mut pool.liquidity_providers, lp_address);
        position.withdrawal_request_time = clock::timestamp_ms(clock);
    }

    /// Withdraw funds after notice period
    public entry fun withdraw_liquidity<USDC>(
        pool: &mut LiquidityPool<USDC>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let lp_address = tx_context::sender(ctx);
        assert!(table::contains(&pool.liquidity_providers, lp_address), E_UNAUTHORIZED);

        let position = table::borrow(&pool.liquidity_providers, lp_address);
        let current_time = clock::timestamp_ms(clock);
        
        assert!(
            position.withdrawal_request_time > 0 && 
            current_time >= position.withdrawal_request_time + WITHDRAWAL_NOTICE_PERIOD,
            E_WITHDRAWAL_LOCKED
        );

        // Calculate withdrawal amount (proportional to shares)
        let total_pool_value = balance::value(&pool.available_liquidity) + pool.total_deployed;
        let withdrawal_amount = (position.shares * total_pool_value) / pool.total_deposited;
        
        assert!(balance::value(&pool.available_liquidity) >= withdrawal_amount, E_POOL_INSUFFICIENT_LIQUIDITY);

        // Calculate earnings
        let earnings = if (withdrawal_amount > position.deposited_amount) {
            withdrawal_amount - position.deposited_amount
        } else {
            0
        };

        // Transfer funds
        let withdrawn_balance = balance::split(&mut pool.available_liquidity, withdrawal_amount);
        let withdrawn_coin = coin::from_balance(withdrawn_balance, ctx);
        transfer::public_transfer(withdrawn_coin, lp_address);

        // Update pool state
        pool.total_deposited = pool.total_deposited - position.deposited_amount;
        table::remove(&mut pool.liquidity_providers, lp_address);

        event::emit(LiquidityWithdrawnEvent {
            pool_id: object::uid_to_inner(&pool.id),
            lp_address,
            amount: withdrawal_amount,
            earnings,
        });
    }

    // ==================== Merchant Functions ====================

    /// Create a loan (called by admin after underwriting)
    public entry fun create_loan<USDC>(
        config: &mut PlatformConfig<USDC>,
        pool: &mut LiquidityPool<USDC>,
        merchant: address,
        principal: u64,
        fee_bps: u64, // Fee in basis points (e.g., 1200 = 12%)
        term_days: u64,
        merchant_tier: u8,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, E_UNAUTHORIZED);
        assert!(!config.paused, E_UNAUTHORIZED);
        assert!(balance::value(&pool.available_liquidity) >= principal, E_POOL_INSUFFICIENT_LIQUIDITY);
        assert!(merchant_tier >= 1 && merchant_tier <= 3, E_INVALID_TERMS);

        let current_time = clock::timestamp_ms(clock);
        let fee_amount = (principal * fee_bps) / BASIS_POINTS;
        let total_repayment = principal + fee_amount;
        let maturity_time = current_time + (term_days * 86400000); // Convert days to ms

        // Create loan object
        let loan = Loan {
            id: object::new(ctx),
            merchant,
            pool_id: object::uid_to_inner(&pool.id),
            principal,
            fee_amount,
            total_repayment,
            amount_repaid: 0,
            disbursement_time: current_time,
            maturity_time,
            status: 0, // Active
            merchant_tier,
            payment_history: vector::empty(),
            late_days: 0,
        };

        let loan_id = object::uid_to_inner(&loan.id);

        // Disburse funds to merchant
        let disbursement = balance::split(&mut pool.available_liquidity, principal);
        let disbursement_coin = coin::from_balance(disbursement, ctx);
        transfer::public_transfer(disbursement_coin, merchant);

        // Update pool state
        pool.total_deployed = pool.total_deployed + principal;
        vector::push_back(&mut pool.active_loans, loan_id);

        // Update platform stats
        config.total_loans_issued = config.total_loans_issued + 1;
        config.total_volume = config.total_volume + principal;

        event::emit(LoanCreatedEvent {
            loan_id,
            merchant,
            pool_id: object::uid_to_inner(&pool.id),
            principal,
            total_repayment,
            maturity_time,
        });

        transfer::share_object(loan);
    }

    /// Make a loan payment
    public entry fun repay_loan<USDC>(
        config: &mut PlatformConfig<USDC>,
        pool: &mut LiquidityPool<USDC>,
        loan: &mut Loan,
        payment: Coin<USDC>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == loan.merchant, E_UNAUTHORIZED);
        assert!(loan.status == 0, E_LOAN_NOT_ACTIVE);

        let payment_amount = coin::value(&payment);
        let remaining = loan.total_repayment - loan.amount_repaid;
        assert!(payment_amount <= remaining, E_INVALID_AMOUNT);

        let current_time = clock::timestamp_ms(clock);
        let is_late = current_time > loan.maturity_time;

        // Record payment
        loan.amount_repaid = loan.amount_repaid + payment_amount;
        let payment_record = Payment {
            amount: payment_amount,
            timestamp: current_time,
            is_late,
        };
        vector::push_back(&mut loan.payment_history, payment_record);

        // Calculate platform fee and insurance allocation
        let platform_fee = (payment_amount * 200) / BASIS_POINTS; // 2% servicing spread
        let insurance_allocation = (platform_fee * INSURANCE_POOL_PERCENTAGE) / 100;

        // Split payment
        let mut payment_balance = coin::into_balance(payment);
        let mut platform_fee_balance = balance::split(&mut payment_balance, platform_fee);
        let insurance_balance = balance::split(&mut platform_fee_balance, insurance_allocation);
        
        balance::join(&mut config.platform_fees_collected, platform_fee_balance);
        balance::join(&mut config.insurance_pool, insurance_balance);
        balance::join(&mut pool.available_liquidity, payment_balance);

        // Check if fully repaid
        let is_full_repayment = loan.amount_repaid >= loan.total_repayment;
        if (is_full_repayment) {
            loan.status = 1; // Repaid
            pool.total_deployed = pool.total_deployed - loan.principal;
            
            // Remove from active loans
            let (found, index) = vector::index_of(&pool.active_loans, &object::uid_to_inner(&loan.id));
            if (found) {
                vector::remove(&mut pool.active_loans, index);
            };
        };

        event::emit(LoanRepaidEvent {
            loan_id: object::uid_to_inner(&loan.id),
            merchant: loan.merchant,
            amount: payment_amount,
            remaining: loan.total_repayment - loan.amount_repaid,
            is_full_repayment,
        });
    }

    /// Mark loan as defaulted (admin only)
    public entry fun mark_default<USDC>(
        config: &mut PlatformConfig<USDC>,
        pool: &mut LiquidityPool<USDC>,
        loan: &mut Loan,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, E_UNAUTHORIZED);
        assert!(loan.status == 0, E_LOAN_NOT_ACTIVE);

        let current_time = clock::timestamp_ms(clock);
        assert!(current_time > loan.maturity_time + (30 * 86400000), E_LOAN_NOT_ACTIVE); // 30 days late

        loan.status = 2; // Defaulted
        let unpaid_amount = loan.total_repayment - loan.amount_repaid;

        // Update pool
        pool.total_deployed = pool.total_deployed - loan.principal;
        let (found, index) = vector::index_of(&pool.active_loans, &object::uid_to_inner(&loan.id));
        if (found) {
            vector::remove(&mut pool.active_loans, index);
        };

        // Update platform stats
        config.total_defaults = config.total_defaults + 1;

        event::emit(LoanDefaultedEvent {
            loan_id: object::uid_to_inner(&loan.id),
            merchant: loan.merchant,
            principal: loan.principal,
            amount_unpaid: unpaid_amount,
        });
    }

    // ==================== Credit Score Functions ====================

    /// Initialize credit score for a merchant
    public entry fun initialize_credit_score(
        merchant: address,
        ctx: &mut TxContext
    ) {
        let credit_score = CreditScore {
            id: object::new(ctx),
            merchant,
            score: 650, // Starting score
            total_loans: 0,
            successful_loans: 0,
            total_borrowed: 0,
            total_repaid: 0,
            current_tier: 1,
            last_updated: 0,
        };

        transfer::transfer(credit_score, merchant);
    }

    /// Update credit score after loan completion
    public entry fun update_credit_score(
        credit_score: &mut CreditScore,
        loan: &Loan,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == credit_score.merchant, E_UNAUTHORIZED);
        assert!(loan.status == 1 || loan.status == 2, E_LOAN_NOT_ACTIVE); // Repaid or Defaulted

        let old_score = credit_score.score;
        credit_score.total_loans = credit_score.total_loans + 1;
        credit_score.total_borrowed = credit_score.total_borrowed + loan.principal;

        if (loan.status == 1) { // Successfully repaid
            credit_score.successful_loans = credit_score.successful_loans + 1;
            credit_score.total_repaid = credit_score.total_repaid + loan.amount_repaid;
            
            // Increase score (max 850)
            let score_increase = if (loan.payment_history.length() > 0) {
                let late_payments = count_late_payments(loan);
                if (late_payments == 0) { 30 } else { 10 }
            } else { 20 };
            
            credit_score.score = if (credit_score.score + score_increase > 850) {
                850
            } else {
                credit_score.score + score_increase
            };
        } else { // Defaulted
            // Decrease score (min 300)
            credit_score.score = if (credit_score.score < 350) {
                300
            } else {
                credit_score.score - 50
            };
        };

        // Update tier based on successful loans
        credit_score.current_tier = if (credit_score.successful_loans >= 5) {
            3 // VIP
        } else if (credit_score.successful_loans >= 1) {
            2 // Proven
        } else {
            1 // New
        };

        credit_score.last_updated = clock::timestamp_ms(clock);

        event::emit(CreditScoreUpdatedEvent {
            merchant: credit_score.merchant,
            old_score,
            new_score: credit_score.score,
            new_tier: credit_score.current_tier,
        });
    }

    // ==================== View Functions ====================

    /// Get pool statistics
    public fun get_pool_stats<USDC>(pool: &LiquidityPool<USDC>): (u64, u64, u64, u64, u64) {
        (
            pool.total_deposited,
            pool.total_deployed,
            balance::value(&pool.available_liquidity),
            pool.expected_apy,
            vector::length(&pool.active_loans)
        )
    }

    /// Get loan details
    public fun get_loan_details(loan: &Loan): (u64, u64, u64, u64, u8) {
        (
            loan.principal,
            loan.total_repayment,
            loan.amount_repaid,
            loan.maturity_time,
            loan.status
        )
    }

    /// Get credit score
    public fun get_credit_score(score: &CreditScore): (u64, u64, u64, u8) {
        (
            score.score,
            score.total_loans,
            score.successful_loans,
            score.current_tier
        )
    }

    // ==================== Helper Functions ====================

    fun count_late_payments(loan: &Loan): u64 {
        let mut late_count = 0;
        let mut i = 0;
        let len = std::vector::length(&loan.payment_history);
        
        while (i < len) {
            let payment = vector::borrow(&loan.payment_history, i);
            if (payment.is_late) {
                late_count = late_count + 1;
            };
            i = i + 1;
        };
        
        late_count
    }
}

// ==================== USDC Token Module (for testing) ====================
module floatly_fi::usdc {
    use std::option;
    use iota::coin;
    use iota::transfer;
    use iota::tx_context;

    public struct USDC has drop {}

    fun init(witness: USDC, ctx: &mut tx_context::TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            6, // 6 decimals like real USDC
            b"USDC",
            b"USD Coin",
            b"Stablecoin for testing Floatly protocol",
            option::none(),
            ctx
        );
        
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
    }
}