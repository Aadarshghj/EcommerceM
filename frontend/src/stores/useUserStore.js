// import {create} from "zustand";
// import {toast} from "react-hot-toast";
// import axios from "../lib/axios";

// export const useUserStore = create((set,get)=> ({
//     user:null,
//     loading:false,
//     checkingAuth:true,
// 	signup: async ({ name, email, password, confirmpassword }) => {
// 		set({ loading: true });

// 		if (password !== confirmpassword) {
// 			set({ loading: false });
// 			return toast.error("Passwords do not match");
// 		}

// 		try {
// 			const res = await axios.post("/auth/signup", { name, email, password });
// 			set({ user: res.data, loading: false });
// 		} catch (error) {
// 			set({ loading: false });
// 			toast.error(error.response.data.message || "An error occurred");
// 		}
//     },
// 		login: async ({email, password}) => {
// 		set({ loading: true });

// 		try {
// 			const res = await axios.post("/auth/login", { email, password });

// 			set({ user: res.data, loading: false });

// 		} catch (error) {
// 			set({ loading: false });
// 			toast.error(error.response.data.message || "An error occurred");
// 		}
// 	},
// 	checkAuth: async () => {
// 		set({ checkingAuth: true });
// 		try {
// 			const response = await axios.get("/auth/profile");
// 			set({ user: response.data, checkingAuth: false });
// 		} catch (error) {
// 			console.log(error.message);
// 			set({ checkingAuth: false, user: null });
// 		}
// 	}

// }))
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create(
	persist(
		(set, get) => ({
			user: null,
			loading: false,
			isCheckingAuth: true, // Changed from checkingAuth to match ProtectedRoute

			signup: async ({ name, email, password, confirmpassword }) => {
				set({ loading: true });

				if (password !== confirmpassword) {
					set({ loading: false });
					return toast.error("Passwords do not match");
				}

				try {
					const res = await axios.post("/auth/signup", { name, email, password });
					set({ user: res.data, loading: false });
					toast.success("Account created successfully!");
				} catch (error) {
					set({ loading: false });
					toast.error(error.response?.data?.message || "An error occurred");
				}
			},

			login: async ({ email, password }) => {
				set({ loading: true });

				try {
					const res = await axios.post("/auth/login", { email, password });
					console.log("Login successful, user data:", res.data); // Debug log
					set({ user: res.data, loading: false });
					toast.success("Logged in successfully!");
				} catch (error) {
					set({ loading: false });
					toast.error(error.response?.data?.message || "An error occurred");
				}
			},

			checkAuth: async () => {
				set({ isCheckingAuth: true });
				try {
					const response = await axios.get("/auth/profile");
					console.log("CheckAuth successful, user data:", response.data); // Debug log
					set({ user: response.data, isCheckingAuth: false });
				} catch (error) {
					console.log("CheckAuth failed:", error.message);
					set({ isCheckingAuth: false, user: null });
				}
			},

			logout: async () => {
				try {
					await axios.post("/auth/logout");
					set({ user: null });
					toast.success("Logged out successfully!");
				} catch (error) {
					// Even if logout fails on server, clear user locally
					set({ user: null });
					toast.error("Logout failed, but you've been logged out locally");
				}
			},
refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().isCheckingAuth) return;

		set({ isCheckingAuth: true })  ;
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},

		}),
		{
			name: "user-store", // localStorage key
			// Only persist user data, not loading states
			partialize: (state) => ({ user: state.user }),
		},
	
		
	)
);

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);