import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5002" : "/";

export const useAuthStore = create((set, get) => ({
  authuser: null,
  isSignin: false,
  isSignup: false,
  onlineUsers: [],
  isupdating: false,
  isCheckingAuth: true,
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); // Ensure correct route
      set({ authuser: res.data });

      get().connectSocket();
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
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authuser: res.data });

      toast.success("Signup successful!");
      // get().connectSocket();
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
      console.log("Response from API:", res.data);
      toast.success("Signin successful!");
      get().connectSocket();
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
      set({ authuser: null });
      localStorage.removeItem("authuser");
      toast.success(res.data?.message || "Logout successful!");
      get().disconnectSocket();
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

  connectSocket: () => {
    const { authuser } = get();
    if (!authuser?._id || get().socket?.connected) {
      console.log("already connected");
    }

    const socket = io(BASE_URL, { query: { userId: authuser?._id } });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // connectSocket: () => {
  //   const { authuser } = get();
  //   if (!authuser?.user?.id || get().socket?.connected) {
  //     console.log("already connected");
  //   }

  //   const socket = io(BASE_URL, { query: { userId: authuser?.user?.id } });
  //   socket.connect();
  //   set({ socket: socket });

  //   socket.on("getOnlineUsers", (userIds) => {
  //     set({ onlineUsers: userIds });
  //   });
  // },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
