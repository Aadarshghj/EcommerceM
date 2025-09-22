import Razorpay from "razorpay";
import dotenv from "dotenv"
dotenv.config()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,       // Add in .env
    key_secret: process.env.RAZORPAY_KEY_SECRET // Add in .env
});

export default razorpay;
