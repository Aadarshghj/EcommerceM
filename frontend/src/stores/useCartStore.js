import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,

    getCartProducts: async () => {
        await axios.get('/cart').then((res) => {
            set({ cart: res.data });
             get().calculateTotal();
        }).catch((error) => {
            set({ cart: [] });
            toast.error(error.response.data.message || "An error occurred");
        })

    },
    addToCart: async (id) => {
        await axios.post('/cart',{ productId: id }).then((res)=>{
             toast.success("product added to cart");
             set({cart:res.data});
          get().calculateTotal();
//            set((prevState)=>{
//             const existingItem = prevState.cart.find((item)=>
// item._id===product._id 
//             )
// const updateCart = existingItem ? prevState.cart.map((item)=>
// item._id===product._id ? {...item , quantity : item.quantity + 1} : item ) : [...prevState.cart , {...product ,quantity:1 }] 

// return {...prevState, cart:updateCart  }

//            })
        })
        
    },

    calculateTotal : () =>{
        const cart = get().cart;
        let temp = cart.reduce((acc,curr)=>(
acc + curr.price * curr.quantity
        ),0)

        set({total:temp})
    },
    clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
    removeAllFromCart:async () =>{
        await axios.delete('/cart').then((res)=>{
                toast.success("cart cleared");
        }).catch((error)=>{
toast.error(error.response.data.error || "Failed to clear cart");
        })
    },
}))