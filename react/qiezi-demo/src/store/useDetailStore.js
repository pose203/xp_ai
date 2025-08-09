import { create } from 'zustand';
import { getImageDetail } from '@/api/detail';

export const useDetailStore = create((set) => ({
  detail: null,
  loading: false,
  error: null,

  fetchDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await getImageDetail(id);
      set({ detail: res.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch detail:', error);
      set({ error: error.message, loading: false });
    }
  },

  clearDetail: () => set({ detail: null }),
}));
