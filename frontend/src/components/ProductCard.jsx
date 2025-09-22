import { Key, ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
const ProductCard = ({ item }) => {

    const {cart , addToCart} = useCartStore()


    const cartHandler = (id) =>{
        addToCart(id)
console.log(cart);
    }
    return (
        <div  className="flex flex-col  rounded-2xl  bg-white ">
            <img src={item.image} className="h-40 w-40 object-cover  p-5 pb-3 " />
            <div className="pl-2 ">
                <h1 className="font-bold text-md  ">{item.name}</h1>
                <p className="font-semibold"> ${item.price}</p>
            </div>
<button onClick={()=>cartHandler(item._id)} className="bg-blue-500 w-fit px-2 py-1 flex flex-row text-center justify-end  gap-1 ml-2 rounded-md mb-2" > <ShoppingCart size={18}/> <p className="text-sm">Add to Cart</p> </button>
        </div>

    );
};

export default ProductCard;
