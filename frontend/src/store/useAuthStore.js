import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data.message });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data.data });

      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });

      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:4000", {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();

    set({ socket: null });
  },
  logout: () => {
    set({ authUser: null });
    get().disconnectSocket();
  },
}));
