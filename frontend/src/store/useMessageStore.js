import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set, get) => ({
  message: [],
  isMessageLoading: false,
  friends: [],
  isFriendLoading: false,
  isLoading: false,
  getMessage: async (id) => {
    try {
      set({ isMessageLoading: true });

      const res = await axiosInstance.get(`/message/${id}`);

      set({ message: res.data.data });
    } catch (error) {
      toast.error(error.message);
      set({ isMessageLoading: false });
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (data) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.post(
        `/message/sendMessages/${data.reciverId}`,
        { ...data }
      );

      set({ message: [...get().message, res.data.newMessage] });
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  getFriends: async () => {
    try {
      set({ isFriendLoading: true });

      const res = await axiosInstance.get(`/message/user`);

      set({ friends: res.data.user });
    } catch (error) {
      toast.error(error.message);
      set({ isFriendLoading: false });
    } finally {
      set({ isFriendLoading: false });
    }
  },
  suscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("newMessage", (data) => {
      set({ message: [...get().message, data] });
    });
  },
  unsuscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
