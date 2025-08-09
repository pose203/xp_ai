import { create } from 'zustand';
import { getImages } from '@/api/home'; 

export const useImageStore = create((set, get) => ({
  images: [],
  page: 1,
  loading: false,
  hasMore: true,
  activeCategory: 'recommend', // 当前激活的分类

  fetchImages: async (category = null) => {
    const { loading, hasMore, page, activeCategory } = get();
    const currentCategory = category || activeCategory;
    
    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const res = await getImages({ 
        page, 
        pageSize: 10,
        category: currentCategory 
      });
      set(state => {
        // 过滤掉可能重复的图片（基于ID）
        const existingIds = new Set(state.images.map(img => img.id));
        const newImages = res.data.list.filter(img => !existingIds.has(img.id));
        
        return {
          images: [...state.images, ...newImages],
          page: state.page + 1,
          hasMore: res.data.hasMore,
        };
      });
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      set({ loading: false });
    }
  },

  // 切换分类，重新加载数据
  switchCategory: async (category) => {
    const { activeCategory } = get();
    if (activeCategory === category) return;

    set({ 
      activeCategory: category, 
      images: [], 
      page: 1, 
      hasMore: true, 
      loading: false 
    });

    // 重新获取数据
    const { fetchImages } = get();
    await fetchImages(category);
  },
  
  reset: () => set({ 
    images: [], 
    page: 1, 
    hasMore: true, 
    loading: false,
    activeCategory: 'recommend'
  }),
}));