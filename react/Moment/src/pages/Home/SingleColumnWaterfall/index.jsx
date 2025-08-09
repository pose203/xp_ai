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
        rootMargin: '100px',
      }
    );

    observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleLoadMore, hasMore, loadingMore, loading, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;

      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      setShowBackToTop(currentScrollY > windowHeight);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollProgress(0);
  }, []);

  const visibleImages = useMemo(() => {
    return images;
  }, [images]);

  if (loading && images.length === 0) {
    return <SingleColumnSkeleton count={3} />;
  }

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
      <div className={styles.imageList}>
        {visibleImages.map((image, index) => (
          <div key={`${image.id}-${index}`} className={styles.imageItem}>
            <ImageCard {...image} singleColumn />
          </div>
        ))}
      </div>

      {hasMore && <div ref={loadMoreRef} className={styles.loadMoreTrigger} style={{ height: '1px' }} />}

      {loadingMore && (
        <div className={styles.loadingMore}>
          <Loading type="spinner" size="20px" className={styles.loadingSpinner}>
            加载更多精彩内容...
          </Loading>
        </div>
      )}

      {!hasMore && images.length > 0 && (
        <div className={styles.noMore}>
          <div className={styles.noMoreContent}>
            <span className={styles.noMoreText}>已经到底了</span>
            <div className={styles.noMoreSubtext}>发现了 {images.length} 张精彩图片</div>
          </div>
        </div>
      )}

      {showBackToTop && (
        <div className={styles.backToTop} onClick={scrollToTop} title={`已浏览 ${Math.round(scrollProgress)}%`}>
          <div
            className={styles.scrollProgress}
            style={{ background: `conic-gradient(#1890ff ${scrollProgress * 3.6}deg, rgba(255,255,255,0.3) 0deg)` }}
          >
            <div className={styles.backToTopIcon}>↑</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleColumnWaterfall;