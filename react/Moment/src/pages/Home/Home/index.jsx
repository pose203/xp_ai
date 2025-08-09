import { useEffect, useCallback, useMemo } from 'react';
import { useImageStore } from '@/store/useImageStore';
import SingleColumnWaterfall from '../SingleColumnWaterfall';
import TabBar from '@/components/TabBar';
import { WelcomeHeader } from '@/components';
import useTitle from '@/hooks/useTitle';

const HomePage = () => {
  useTitle('首页');

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

  const { images, loading, hasMore, activeCategory, fetchImages, switchCategory } = useImageStore();

  useEffect(() => {
    if (images.length === 0) {
      fetchImages();
    }
  }, [images.length, fetchImages]);

  const handleTabChange = useCallback((category) => {
    switchCategory(category);
  }, [switchCategory]);

  return (
    <div style={{ 
      flex: 1, display: 'flex', flexDirection: 'column', height: '100%',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(212, 148, 108, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(230, 166, 121, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none', zIndex: 0
      }} />

      <WelcomeHeader />

      <TabBar tabs={tabs} activeTab={activeCategory} onTabChange={handleTabChange} />

      <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 1 }}>
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