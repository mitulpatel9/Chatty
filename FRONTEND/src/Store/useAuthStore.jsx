import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authuser: null,
  isSignin: false,
  isSignup: false,
  onlineUsers: [],
  isupdating: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); // Ensure correct route
      // console.log("Response from API / its in checkauth from stor:", res.data); // Ensure the response shows correct user data
      set({ authuser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error.response?.data || error.message);
      set({ authuser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignup: true });
    try {
      console.log("Response from API:", data);
      const res = axiosInstance.post("/auth/signup", data);
      set({ authuser: res.data });

      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in signup:", error.response?.data || error.message);
      set({ authuser: null });
    } finally {
      set({ isSignup: false });
    }
  },
  signin: async (data) => {
    set({ isSignin: true });
    try {
      const res = await axiosInstance.post("/auth/signin", data);
      set({ authuser: res.data });
      toast.success("Signin successful!");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in signin:", error.response?.data || error.message);
      set({ authuser: null });
    } finally {
      set({ isSignin: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout"); // Wait for the request to complete
      console.log("Response from API:", res.data);
      set({ authuser: null });
      toast.success(res.data?.message || "Logout successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed. Try again.");
      console.error("Error in logout:", error.response?.data || error.message);
    }
  },
  updateProfile: async (data) => {
    set({ isupdating: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authuser: res.data });
      console.log("Response from API:", res.data);
      toast.success("Profile Picture has been updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(
        "Error in updateProfile:",
        error.response?.data || error.message
      );
      set({ authuser: null });
    } finally {
      set({ isupdating: false });
    }
  },
}));
