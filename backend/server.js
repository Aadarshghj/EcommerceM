import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import prodctRoutes from "./routes/products.route.js"
import cartRoutes from './routes/cart.route.js'
import coupenRoutes from './routes/coupen.routes.js'
import './db/db.js'
import cookieParser from "cookie-parser";
import paymentRoutes from './routes/payment.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import cors from "cors";
import path from "path";
dotenv.config();


const app = express();
const PORT =  process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));  
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/products",prodctRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/coupen",coupenRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)

})