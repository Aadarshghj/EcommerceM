import Coupon from "../models/coupen.model.js";
import Order from "../models/order.model.js";
import razorpay   from  "../db/rayzorpay.js"
import crypto from "crypto";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    products.forEach(product => {
      totalAmount += product.price * product.quantity; // price already in INR
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
      if (coupon) {
        totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
      }
    }

    const options = {
      amount: totalAmount * 100, // Razorpay accepts amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        products: JSON.stringify(products),
        couponCode: couponCode || ""
      }
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: totalAmount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};



export const checkoutSuccess = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Retrieve notes from DB or from a temporary store (optional)
    // For example, store products & couponCode when creating order
    // Here, we assume you pass them again in req.body for simplicity:
    const products = req.body.products;
    const couponCode = req.body.couponCode;
    const userId = req.user._id;

    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode, userId },
        { isActive: false }
      );
    }

    const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const newOrder = new Order({
      user: userId,
      products: products.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        price: p.price
      })),
      totalAmount,
      stripeSessionId: razorpay_payment_id // You can rename this field in your schema
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order created",
      orderId: newOrder._id
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};
