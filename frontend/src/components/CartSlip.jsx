import React from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const CartSlip = ({ total }) => {
  const { cart, clearCart , removeAllFromCart} = useCartStore(); // 👈 get clearCart from store

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "/payments/create-checkout-session",
        { products: cart },
        { withCredentials: true }
      );

      const { orderId, amount, key } = data;

      const options = {
        key,
        amount: amount * 100,
        currency: "INR",
        name: "My Shop",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("/payments/checkout-success", {
              ...response,
              products: cart,
              couponCode: null,
            });

            if (verifyRes.data.success) {
              alert("✅ Payment successful!");
              clearCart(); // 👈 clear cart after successful payment
               removeAllFromCart();
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error("verify failed", err.response?.data || err.message);
          }
        },
        prefill: {
          name: "Your Name",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
      {/* Total */}
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-medium">Total</h1>
        <h4>
          ₹<span>{total}</span>
        </h4>
      </div>

      <div className="border-b border-dotted border-gray-400" />

      {/* Subtotal */}
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-medium">Subtotal</h1>
        <h4>
          ₹<span>{total}</span>
        </h4>
      </div>

      <div className="border-b border-dotted border-gray-400" />

      {/* Checkout button */}
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSlip;
