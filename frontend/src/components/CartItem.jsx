import React, { useEffect } from "react";
import CartProduct from "../pages/CartProduct";
import { useCartStore } from "../stores/useCartStore";
import CartSlip from "./CartSlip";

const CartItem = () => {
  const { cart, getCartProducts, total } = useCartStore();

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Cart Items */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {cart.map((item) => (
          <CartProduct key={item._id} item={item} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <CartSlip total={total} />
      </div>
    </div>
  );
};

export default CartItem;
 