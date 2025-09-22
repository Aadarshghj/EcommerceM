import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";


export const useProductStore = create((set, get) => ({

    products: [],
    loading: false,

    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post('/products', productData);
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false
            }))
            toast.success("Product created successfully!");
        } catch (error) {
            toast.error(error.response.data.error);
            set({ loading: false });

        }



    },

    getAllProducts: async () => {
        set({ loading: true });

        await axios.get('/products').then((res) => {
            set({ products: res.data, loading: false })


        }).catch((error) => {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response.data.error || "Failed to fetch   products");
        })


    },



    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        await axios.get(`/products/category/${category}`).then((res) => {
            set({ products: res.data.products ,loading:false})

        }).catch((error) => {
            set({ error: "Failed to fetch products by category", loading: false });
            toast.error(error.response.data.error || "Failed to fetch  category products");
        })
    },

   	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
    toggleFeaturedProduct: async (id) => {
        set({ loading: true });
        await axios.patch(`/products/${id}`).then((res) => {
            set((prev) => (
                {
                    products: prev.products.map((item) => {
                   return   item._id === id ? { ...item, isFeatured: res.data.isFeatured } : item

                    }),
                    loading: false,
                }
            ))

        }).catch((error) => {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to update product");
        })

    },
    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/featured");
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            console.log("Error fetching featured products:", error);
        }
    },
}))

