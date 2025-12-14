import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import notarizationRoutes from "./routes/notarizationRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/notarizations", notarizationRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Floatly.fi Backend API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    services: {
      notarization: "IOTA Notarization for loan documents",
      identity: "IOTA Identity for merchant credentials (coming soon)"
    },
    endpoints: {
      health: "GET /api/notarizations/health",
      walletInfo: "GET /api/notarizations/wallet/info",
      createHash: "POST /api/notarizations/hash (multipart/form-data, field: file)",
      createDynamic: "POST /api/notarizations/dynamic",
      createLocked: "POST /api/notarizations/locked",
      updateState: "PUT /api/notarizations/:id/state",
      updateMetadata: "PUT /api/notarizations/:id/metadata",
      transfer: "POST /api/notarizations/:id/transfer",
      destroy: "DELETE /api/notarizations/:id",
      getDetails: "GET /api/notarizations/:id",
      verify: "POST /api/notarizations/verify",
    },
    documentation: "Use Postman to test all endpoints",
  });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: error.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    availableEndpoints: [
      "GET /",
      "GET /api/notarizations/health",
      "POST /api/notarizations/dynamic",
      "POST /api/notarizations/locked",
      "GET /api/notarizations/:id",
      "POST /api/notarizations/verify",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Floatly Backend running on port ${PORT}`);
  console.log(`📡 Connected to network: testnet`);
  console.log(`🔗 Notarization Package ID: ${process.env.IOTA_NOTARIZATION_PKG_ID || 'NOT SET'}`);
  console.log(`🌐 API Base: http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/notarizations/health`);
  console.log(`📋 API Documentation: http://localhost:${PORT}/`);
});
