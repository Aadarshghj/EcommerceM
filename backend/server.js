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

// 🔍 Enhanced debugging - load routes one by one with process.exit to isolate the problem
try {
	console.log("Loading /api/auth");
	app.use("/api/auth", authRoutes);
	console.log("✅ Auth routes loaded successfully");
} catch (err) {
	console.error("❌ Error in /api/auth:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}

try {
	console.log("Loading /api/products");
	app.use("/api/products", prodctRoutes);
	console.log("✅ Products routes loaded successfully");
} catch (err) {
	console.error("❌ Error in /api/products:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}

try {
	console.log("Loading /api/cart");
	app.use("/api/cart", cartRoutes);
	console.log("✅ Cart routes loaded successfully");
} catch (err) {
	console.error("❌ Error in /api/cart:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}

try {
	console.log("Loading /api/coupen");
	app.use("/api/coupen", coupenRoutes);
	console.log("✅ Coupen routes loaded successfully");
} catch (err) {
	console.error("❌ Error in /api/coupen:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}

try {
	console.log("Loading /api/payments");
	app.use("/api/payments", paymentRoutes);
	console.log("✅ Payments routes loaded successfully");
} catch (err) {
	console.error("❌ Error in /api/payments:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}

try {
	console.log("Loading /api/analytics");
	app.use("/api/analytics", analyticsRoutes);
	console.log("✅ Analytics routes loaded successfully");
} catch (err) {
	console.error("❌ Error in /api/analytics:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}

console.log("🎉 All routes registered successfully!");

// Production static files setup
if (process.env.NODE_ENV === "production") {
	console.log("📁 Setting up production static files...");
	
	try {
		app.use(express.static(path.join(__dirname, "/frontend/dist")));
		console.log("✅ Static files middleware added");
		
		// Try different catch-all patterns to see which works
		// Option 1: Use regex instead of string pattern
		app.get(/.*/, (req, res) => {
			res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
		});
		console.log("✅ Catch-all route added with regex");
		
	} catch (err) {
		console.error("❌ Error setting up production files:", err.message);
		console.error("Stack:", err.stack);
		
		// If regex fails, try a different approach
		try {
			console.log("🔄 Trying alternative catch-all approach...");
			app.get("/:path(*)", (req, res) => {
				res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
			});
			console.log("✅ Catch-all route added with parameter approach");
		} catch (err2) {
			console.error("❌ Alternative approach also failed:", err2.message);
			process.exit(1);
		}
	}
}

console.log("🚀 Starting server...");

try {
	app.listen(PORT, () => {
		console.log(`🚀 Server is running on port ${PORT}`);
	});
} catch (err) {
	console.error("❌ Error starting server:", err.message);
	console.error("Stack:", err.stack);
	process.exit(1);
}
