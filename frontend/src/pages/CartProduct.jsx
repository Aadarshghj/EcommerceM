import React from "react";
import { Trash } from "lucide-react";

const CartProduct = ({ item }) => {
  return (
    <div className="bg-white w-full min-h-7 flex flex-col sm:flex-row border rounded-lg shadow-sm overflow-hidden">
      {/* Image */}
      <img
        src={item.image}
        className="object-cover h-40 w-full sm:w-40 p-4"
        alt={item.name}
      />

      {/* Details */}
      <div className="flex flex-col px-4 pb-4 sm:pb-0">
        <h5 className="font-semibold py-2">{item.name}</h5>
        <h4 className="font-semibold py-2 text-gray-700">${item.price}</h4>

        <div className="flex flex-row items-center justify-between gap-4 mt-2">
          <h6>
            Quantity <span>{item.quantity}</span>
          </h6>
          <button className="p-1 hover:opacity-75">
            <Trash className="text-red-600" size={23} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
