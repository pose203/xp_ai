import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Loading } from 'react-vant';
import ImageCard from '../ImageCard';
import SingleColumnSkeleton from '@/components/SingleColumnSkeleton';
import styles from './single-column-waterfall.module.css';

const SingleColumnWaterfall = ({ images, loading, hasMore, fetchMore }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const loadMoreRef = useRef(null);
  const containerRef = useRef(null);
  const observer = useRef(null);

  const lastScrollY = useRef(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 处理无限滚动加载
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || loading) return;
    
    setLoadingMore(true);
    try {
      await fetchMore();
    } catch (error) {
      console.error('加载更多失败:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [fetchMore, loadingMore, hasMore, loading]);

  // 设置 Intersection Observer 监听加载更多
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || !isVisible) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingMore && !loading && isVisible) {
          handleLoadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // 提前100px开始加载，提升体验
      }
    );

    observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleLoadMore, hasMore, loadingMore, loading, isVisible]);

  // 监听滚动，显示/隐藏回到顶部按钮和计算滚动进度
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      
      // 计算滚动进度
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
      
      // 滚动超过一屏幕高度时显示回到顶部
      setShowBackToTop(currentScrollY > windowHeight);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 页面可见性检测，优化性能
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 回到顶部
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // 重置滚动进度
    setScrollProgress(0);
  }, []);

  // 优化图片渲染，使用虚拟化或分批渲染
  const visibleImages = useMemo(() => {
    // 如果图片数量很大，可以考虑只渲染可见区域的图片
    return images;
  }, [images]);

  // 如果正在初始加载且没有数据，显示骨架屏
  if (loading && images.length === 0) {
    return <SingleColumnSkeleton count={3} />;
  }

  // 如果没有数据且不在加载中，显示空状态
  if (!loading && images.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📷</div>
          <div className={styles.emptyTitle}>暂无内容</div>
          <div className={styles.emptyDesc}>精彩内容正在准备中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
      {/* 图片列表 */}
      <div className={styles.imageList}>
        {visibleImages.map((image, index) => (
          <div key={`${image.id}-${index}`} className={styles.imageItem}>
            <ImageCard {...image} singleColumn />
          </div>
        ))}
      </div>

      {/* 加载更多触发器 */}
      {hasMore && (
        <div 
          ref={loadMoreRef} 
          className={styles.loadMoreTrigger}
          style={{ height: '1px' }}
        />
      )}

      {/* 加载状态 */}
      {loadingMore && (
        <div className={styles.loadingMore}>
          <Loading type="spinner" size="20px" className={styles.loadingSpinner}>
            加载更多精彩内容...
          </Loading>
        </div>
      )}

      {/* 没有更多内容 */}
      {!hasMore && images.length > 0 && (
        <div className={styles.noMore}>
          <div className={styles.noMoreContent}>
            <span className={styles.noMoreText}>已经到底了</span>
            <div className={styles.noMoreSubtext}>
              发现了 {images.length} 张精彩图片
            </div>
          </div>
        </div>
      )}

      {/* 回到顶部按钮和滚动进度 */}
      {showBackToTop && (
        <div 
          className={styles.backToTop}
          onClick={scrollToTop}
          title={`已浏览 ${Math.round(scrollProgress)}%`}
        >
          <div className={styles.scrollProgress} style={{ 
            background: `conic-gradient(#1890ff ${scrollProgress * 3.6}deg, rgba(255,255,255,0.3) 0deg)` 
          }}>
            <div className={styles.backToTopIcon}>↑</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleColumnWaterfall;