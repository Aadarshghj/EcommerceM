import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import prodctRoutes from "./routes/products.route.js";
import cartRoutes from "./routes/cart.route.js";
import coupenRoutes from "./routes/coupen.routes.js";
import "./db/db.js";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(
	cors({
		origin: "http://localhost:5173", // frontend
		credentials: true,
	})
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// 🔍 Debugging each route load
try {
	console.log("Loading /api/auth");
	app.use("/api/auth", authRoutes);
} catch (err) {
	console.error("❌ Error in /api/auth:", err);
}

try {
	console.log("Loading /api/products");
	app.use("/api/products", prodctRoutes);
} catch (err) {
	console.error("❌ Error in /api/products:", err);
}

try {
	console.log("Loading /api/cart");
	app.use("/api/cart", cartRoutes);
} catch (err) {
	console.error("❌ Error in /api/cart:", err);
}

try {
	console.log("Loading /api/coupen");
	app.use("/api/coupen", coupenRoutes);
} catch (err) {
	console.error("❌ Error in /api/coupen:", err);
}

try {
	console.log("Loading /api/payments");
	app.use("/api/payments", paymentRoutes);
} catch (err) {
	console.error("❌ Error in /api/payments:", err);
}

try {
	console.log("Loading /api/analytics");
	app.use("/api/analytics", analyticsRoutes);
} catch (err) {
	console.error("❌ Error in /api/analytics:", err);
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // ✅ Simple wildcard - catches all routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});
