import {
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { useImageStore } from '@/store/useImageStore';
import SingleColumnWaterfall from '../SingleColumnWaterfall';
import TabBar from '@/components/TabBar';
import { WelcomeHeader } from '@/components';
import useTitle from '@/hooks/useTitle';

const HomePage = () => {
  // 设置页面标题
  useTitle('首页');

  // 定义选项卡数据 - 使用useMemo优化
  const tabs = useMemo(() => [
    { key: 'recommend', label: '推荐' },
    { key: 'photography', label: '摄影' },
    { key: 'landscape', label: '风景' },
    { key: 'portrait', label: '人像' },
    { key: 'food', label: '美食' },
    { key: 'pets', label: '萌宠' },
    { key: 'art', label: '艺术' },
    { key: 'lifestyle', label: '生活' },
  ], []);

  const { 
    images, 
    loading, 
    hasMore, 
    activeCategory, 
    fetchImages, 
    switchCategory
  } = useImageStore();

  useEffect(() => {
    // 组件挂载时，如果列表为空，则加载第一页数据
    if (images.length === 0) {
      fetchImages();
    }
  }, [images.length, fetchImages]);

  // 处理选项卡切换 - 使用useCallback优化
  const handleTabChange = useCallback((category) => {
    switchCategory(category);
  }, [switchCategory]);

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      position: 'relative'
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(212, 148, 108, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(230, 166, 121, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      {/* 欢迎头部 */}
      <WelcomeHeader />
      
      {/* 顶部选项卡 */}
      <TabBar
        tabs={tabs}
        activeTab={activeCategory}
        onTabChange={handleTabChange}
      />
      
      {/* 单列瀑布流内容 */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        position: 'relative',
        zIndex: 1
      }}>
        <SingleColumnWaterfall
          images={images}
          loading={loading}
          hasMore={hasMore}
          fetchMore={fetchImages}
        />
      </div>
    </div>
  );
};

export default HomePage;
