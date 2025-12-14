# 🚀 Floatly.fi - Decentralized Lending Platform

> Connecting crypto liquidity to real e-commerce businesses

Floatly is a decentralized lending protocol that bridges the gap between crypto investors seeking yield and e-commerce merchants needing inventory capital. Built on IOTA blockchain with Move smart contracts, featuring full document notarization and decentralized identity.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![Move](https://img.shields.io/badge/Move-2024-blue)](https://docs.iota.org/)
[![IOTA](https://img.shields.io/badge/IOTA-Testnet-blue)](https://testnet.iota.org)

## 🌟 New Features

✅ **Backend API Implemented** - Express.js backend with IOTA notarization  
✅ **Document Notarization** - SHA-256 hashing and blockchain verification  
✅ **Wallet Management** - Secure key handling with testnet integration  
✅ **JWT Authentication** - Ready for secure API access  
✅ **TypeScript** - Full type safety across backend and frontend

## 📋 Overview

Floatly enables e-commerce merchants to access $500-$5,000 in working capital within 24 hours, while crypto investors earn 8-15% APY on their stablecoin deposits. The platform uses real business performance data for credit decisioning and on-chain smart contracts for transparent, trustless lending.

### Key Features

- **For Merchants**
  - Fast approval (24 hours)
  - No traditional credit check required
  - $500-$5,000 capital range
  - Shopify integration
  - Flexible repayment terms

- **For Investors**
  - 8-15% APY on USDC deposits
  - Geographic and risk-tier diversification
  - Transparent on-chain loan performance
  - Insurance pool protection
  - Real-time portfolio tracking

- **Platform**
  - Built on IOTA blockchain
  - Move smart contracts for security
  - On-chain credit scoring (NFT-based)
  - Multi-tier risk pools
  - <5% default rate target

## 🏗️ Architecture

```
floatly.fi/
├── floatly-mvp/          # Next.js frontend application
│   ├── app/              # App router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── investor/     # Investor portal
│   │   ├── merchant/     # Merchant portal
│   │   └── login/        # Authentication
│   ├── components/       # React components & UI library
│   └── lib/              # Utilities
│
└── smart-contracts/      # Move smart contracts
    ├── sources/          # Contract source code
    │   └── floatly_fi.move
    └── tests/            # Contract tests
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks
- **Theme**: next-themes (dark/light mode)

### Smart Contracts
- **Blockchain**: IOTA
- **Language**: Move (2024 edition)
- **Features**: 
  - Lending pools with geographic/risk tiers
  - On-chain credit scoring
  - Automated loan lifecycle management
  - LP position tracking
  - Insurance pool mechanism

### Key Dependencies
- React Hook Form + Zod validation
- Lucide React icons
- date-fns for date handling
- CMDK for command palette

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- IOTA CLI and Move toolchain
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/mzf11125/floatly.fi.git
cd floatly.fi/floatly-mvp

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`

### Smart Contract Setup

```bash
cd smart-contracts

# Build contracts
iota move build

# Run tests
iota move test

# Deploy (configure network first)
iota client publish --gas-budget 100000000
```

## 📊 Smart Contract Architecture

### Core Modules

1. **PlatformConfig**: Global platform state and admin controls
2. **LiquidityPool**: Regional/risk-tier specific lending pools
3. **Loan**: Individual loan contracts with payment tracking
4. **CreditScore**: On-chain credit scoring NFTs
5. **LPToken**: Liquidity provider share tokens

### Key Functions

- `create_liquidity_pool`: Initialize new lending pool
- `deposit_liquidity`: LP deposits USDC
- `request_loan`: Merchant applies for capital
- `approve_loan`: Admin approves and disburses
- `repay_loan`: Merchant makes payments
- `withdraw_liquidity`: LP exits with earnings
- `update_credit_score`: Update merchant reputation

### Economic Model

- **Insurance Pool**: 10% of fees
- **Minimum Pool Deposit**: 1,000 USDC
- **Withdrawal Notice**: 7 days
- **Risk Tiers**: Conservative, Balanced, Aggressive
- **Merchant Tiers**: New, Proven, VIP

## 🎯 User Flows

### Merchant Journey
1. Connect Shopify store
2. AI analyzes 6+ months of sales data
3. Get approved in 24 hours
4. Receive capital via stablecoin
5. Repay over 30-90 days
6. Build on-chain credit score

### Investor Journey
1. Connect wallet
2. Choose pool (geography/risk)
3. Deposit USDC
4. Earn yield automatically
5. Monitor loan performance
6. Withdraw anytime (7-day notice)

## 📱 Available Routes

### Public
- `/` - Landing page
- `/login` - Authentication
- `/signup` - Registration

### Merchant
- `/merchant/apply` - Application form
- `/merchant/dashboard` - Loan management

### Investor
- `/investor/dashboard` - Portfolio & deposits

### Admin
- `/admin/dashboard` - Platform oversight

## 🧪 Testing

```bash
# Frontend tests
cd floatly-mvp
pnpm test

# Smart contract tests
cd smart-contracts
iota move test

# Specific test
iota move test floatly_fi_tests
```

## 🔒 Security

- Move's type safety and resource model
- Formal verification support
- Role-based access control
- Multi-signature admin operations
- Insurance pool for defaults
- Rate limiting and circuit breakers

## 🌍 Deployment

### Frontend (Vercel)
```bash
# Connect repository to Vercel
# Auto-deploys on push to main

# Or deploy manually
vercel --prod
```

### Smart Contracts (IOTA)
```bash
# Configure network
iota client new-env --alias mainnet --rpc https://api.mainnet.iota.cafe

# Publish
iota client publish --gas-budget 100000000
```

## 📦 Deployed Smart Contract

**Transaction Digest**: `DjArFUoSTMFGJZCRF865mzDK3j7jvpk9zMXmnhE4SWZR`

**Package ID**: `0x7e063d12c036a90def82f38439a068ce51c3bddce38ed38051813ac8e6dc178e`

**Modules**: `lending_protocol`, `usdc`

**Network**: IOTA Testnet (Epoch 391)

### Created Objects

| Object Type | Object ID |
|------------|-----------|
| `UpgradeCap` | `0x3f294b94e6dd01bc20e429971084b1c2e207765a7ac6637790be2e165150498f` |
| `TreasuryCap<USDC>` | `0x97140c6699ba3aa43b619068943586d69c39aa6dad767fce8d24359873805e7d` |
| `CoinMetadata<USDC>` | `0x8d51f3f850b1671f2b3bbcf9d8ccace25daa09d3d966dd1c3b80700f41c751da` |

### Transaction Details

```
Transaction Digest: DjArFUoSTMFGJZCRF865mzDK3j7jvpk9zMXmnhE4SWZR
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Transaction Data                                                                                             │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Sender: 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab                                   │
│ Gas Owner: 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab                                │
│ Gas Budget: 60998800 NANOS                                                                                   │
│ Gas Price: 1000 NANOS                                                                                        │
│ Gas Payment:                                                                                                 │
│  ┌──                                                                                                         │
│  │ ID: 0xba8680f6533dadd29edeea52adcc702468e93f137a284c9382590dea22f973e8                                    │
│  │ Version: 545058708                                                                                        │
│  │ Digest: E7ezB2VZA8Va6oNHhfTqiwECoWDtGXbUuPMqCtUXMBEw                                                      │
│  └──                                                                                                         │
│                                                                                                              │
│ Transaction Kind: Programmable                                                                               │
│ ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────╮ │
│ │ Input Objects                                                                                            │ │
│ ├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ 0   Pure Arg: Type: address, Value: "0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab" │ │
│ ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯ │
│ ╭─────────────────────────────────────────────────────────────────────────╮                                  │
│ │ Commands                                                                │                                  │
│ ├─────────────────────────────────────────────────────────────────────────┤                                  │
│ │ 0  Publish:                                                             │                                  │
│ │  ┌                                                                      │                                  │
│ │  │ Dependencies:                                                        │                                  │
│ │  │   0x0000000000000000000000000000000000000000000000000000000000000002 │                                  │
│ │  │   0x0000000000000000000000000000000000000000000000000000000000000001 │                                  │
│ │  └                                                                      │                                  │
│ │                                                                         │                                  │
│ │ 1  TransferObjects:                                                     │                                  │
│ │  ┌                                                                      │                                  │
│ │  │ Arguments:                                                           │                                  │
│ │  │   Result 0                                                           │                                  │
│ │  │ Address: Input  0                                                    │                                  │
│ │  └                                                                      │                                  │
│ ╰─────────────────────────────────────────────────────────────────────────╯                                  │
│                                                                                                              │
│ Signatures:                                                                                                  │
│    mwWUU5lBieHMnVsLIx/HN5/9sedaQMWaJZAg6Dtfr83lzciDUHE4WnAkyYyu2RihgySAx6Xj54y0YhNVI1muCA==                  │
│                                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭───────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Transaction Effects                                                                               │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Digest: DjArFUoSTMFGJZCRF865mzDK3j7jvpk9zMXmnhE4SWZR                                              │
│ Status: Success                                                                                   │
│ Executed Epoch: 391                                                                               │
│                                                                                                   │
│ Created Objects:                                                                                  │
│  ┌──                                                                                              │
│  │ ID: 0x3f294b94e6dd01bc20e429971084b1c2e207765a7ac6637790be2e165150498f                         │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )  │
│  │ Version: 545058709                                                                             │
│  │ Digest: F4LHjij18bS7zQxsBUvp6BmBQo6iRjyiYDZYraCZHQ5u                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0x7e063d12c036a90def82f38439a068ce51c3bddce38ed38051813ac8e6dc178e                         │
│  │ Owner: Immutable                                                                               │
│  │ Version: 1                                                                                     │
│  │ Digest: CH4FtBj4MsUkh2a9wkvpJ1HS6tJdB78UrwTceNiTxQK4                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0x8d51f3f850b1671f2b3bbcf9d8ccace25daa09d3d966dd1c3b80700f41c751da                         │
│  │ Owner: Immutable                                                                               │
│  │ Version: 545058709                                                                             │
│  │ Digest: 9kPZt9GyqoYi4uCXjEaJhxYCAMeMpuzu3RNPstD159si                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0x97140c6699ba3aa43b619068943586d69c39aa6dad767fce8d24359873805e7d                         │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )  │
│  │ Version: 545058709                                                                             │
│  │ Digest: 6bHW1vFUQRsRWE5tV2XiDPMdj1x5rLGGHPxzniKkp5MH                                           │
│  └──                                                                                              │
│ Mutated Objects:                                                                                  │
│  ┌──                                                                                              │
│  │ ID: 0xba8680f6533dadd29edeea52adcc702468e93f137a284c9382590dea22f973e8                         │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )  │
│  │ Version: 545058709                                                                             │
│  │ Digest: DbEFGiziSyncjpXhFcLrqW9SEkuPkqC8X2qKoGKZLU1K                                           │
│  └──                                                                                              │
│ Gas Object:                                                                                       │
│  ┌──                                                                                              │
│  │ ID: 0xba8680f6533dadd29edeea52adcc702468e93f137a284c9382590dea22f973e8                         │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )  │
│  │ Version: 545058709                                                                             │
│  │ Digest: DbEFGiziSyncjpXhFcLrqW9SEkuPkqC8X2qKoGKZLU1K                                           │
│  └──                                                                                              │
│ Gas Cost Summary:                                                                                 │
│    Storage Cost: 58998800 NANOS                                                                   │
│    Computation Cost: 1000000 NANOS                                                                │
│    Computation Cost Burned: 1000000 NANOS                                                         │
│    Storage Rebate: 980400 NANOS                                                                   │
│    Non-refundable Storage Fee: 0 NANOS                                                            │
│                                                                                                   │
│ Transaction Dependencies:                                                                         │
│    CY14gCcLcVuSMN9Hq7Ya6vEhBAzSzciNw47togWXJAZ8                                                   │
│    Eb8PDKScbcJgGF1qHHaJHqhvt5uFiMzdqsVcKyqTVaDk                                                   │
╰───────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─────────────────────────────╮
│ No transaction block events │
╰─────────────────────────────╯

╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Object Changes                                                                                                          │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Created Objects:                                                                                                        │
│  ┌──                                                                                                                    │
│  │ ObjectID: 0x3f294b94e6dd01bc20e429971084b1c2e207765a7ac6637790be2e165150498f                                         │
│  │ Sender: 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab                                           │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )                        │
│  │ ObjectType: 0x2::package::UpgradeCap                                                                                 │
│  │ Version: 545058709                                                                                                   │
│  │ Digest: F4LHjij18bS7zQxsBUvp6BmBQo6iRjyiYDZYraCZHQ5u                                                                 │
│  └──                                                                                                                    │
│  ┌──                                                                                                                    │
│  │ ObjectID: 0x8d51f3f850b1671f2b3bbcf9d8ccace25daa09d3d966dd1c3b80700f41c751da                                         │
│  │ Sender: 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab                                           │
│  │ Owner: Immutable                                                                                                     │
│  │ ObjectType: 0x2::coin::CoinMetadata<0x7e063d12c036a90def82f38439a068ce51c3bddce38ed38051813ac8e6dc178e::usdc::USDC>  │
│  │ Version: 545058709                                                                                                   │
│  │ Digest: 9kPZt9GyqoYi4uCXjEaJhxYCAMeMpuzu3RNPstD159si                                                                 │
│  └──                                                                                                                    │
│  ┌──                                                                                                                    │
│  │ ObjectID: 0x97140c6699ba3aa43b619068943586d69c39aa6dad767fce8d24359873805e7d                                         │
│  │ Sender: 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab                                           │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )                        │
│  │ ObjectType: 0x2::coin::TreasuryCap<0x7e063d12c036a90def82f38439a068ce51c3bddce38ed38051813ac8e6dc178e::usdc::USDC>   │
│  │ Version: 545058709                                                                                                   │
│  │ Digest: 6bHW1vFUQRsRWE5tV2XiDPMdj1x5rLGGHPxzniKkp5MH                                                                 │
│  └──                                                                                                                    │
│ Mutated Objects:                                                                                                        │
│  ┌──                                                                                                                    │
│  │ ObjectID: 0xba8680f6533dadd29edeea52adcc702468e93f137a284c9382590dea22f973e8                                         │
│  │ Sender: 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab                                           │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )                        │
│  │ ObjectType: 0x2::coin::Coin<0x2::iota::IOTA>                                                                         │
│  │ Version: 545058709                                                                                                   │
│  │ Digest: DbEFGiziSyncjpXhFcLrqW9SEkuPkqC8X2qKoGKZLU1K                                                                 │
│  └──                                                                                                                    │
│ Published Objects:                                                                                                      │
│  ┌──                                                                                                                    │
│  │ PackageID: 0x7e063d12c036a90def82f38439a068ce51c3bddce38ed38051813ac8e6dc178e                                        │
│  │ Version: 1                                                                                                           │
│  │ Digest: CH4FtBj4MsUkh2a9wkvpJ1HS6tJdB78UrwTceNiTxQK4                                                                 │
│  │ Modules: lending_protocol, usdc                                                                                      │
│  └──                                                                                                                    │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭───────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Balance Changes                                                                                   │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│  ┌──                                                                                              │
│  │ Owner: Account Address ( 0x34d269d00516030cfab721732b0e94c7c0dbd7a3bbe98e27532958c31b7a97ab )  │
│  │ CoinType: 0x2::iota::IOTA                                                                      │
│  │ Amount: -59018400                                                                              │
│  └──                                                                                              │
╰───────────────────────────────────────────────────────────────────────────────────────────────────╯
```

## 📈 Roadmap

- [x] MVP smart contracts
- [x] Basic UI/UX
- [ ] Shopify integration
- [ ] AI credit scoring model
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Mobile app
- [ ] Secondary market for loans
- [ ] Governance token

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by the Floatly team

## 📞 Contact

- Website: [floatly.fi](https://floatly.fi)
- Twitter: [@floatly_fi](https://twitter.com/floatly_fi)
- Email: hello@floatly.fi

## 🙏 Acknowledgments

- IOTA Foundation for Move support
- shadcn for the beautiful UI components
- Vercel for hosting infrastructure
- The entire DeFi community

---

**Disclaimer**: This is experimental DeFi software. Use at your own risk. Not financial advice.