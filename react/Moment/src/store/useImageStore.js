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
      // axios 响应已被拦截器改为 response.data：
      // - 常见结构：{ code, message, data: { list, hasMore, ... } }
      // - 也可能直接：{ list, hasMore }
      const payload = res?.data?.data ?? res?.data ?? res ?? {};
      const list = Array.isArray(payload.list) ? payload.list : [];
      const nextHasMore = typeof payload.hasMore === 'boolean' ? payload.hasMore : list.length > 0;

      set(state => {
        // 过滤掉可能重复的图片（基于ID）
        const existingIds = new Set(state.images.map(img => img.id));
        const deduped = list.filter(img => !existingIds.has(img.id));
        return {
          images: [...state.images, ...deduped],
          page: state.page + 1,
          hasMore: nextHasMore,
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
