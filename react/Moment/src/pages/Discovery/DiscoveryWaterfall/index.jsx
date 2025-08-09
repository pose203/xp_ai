import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { Loading } from 'react-vant';
import ImageCard from '../../Home/ImageCard';
import styles from './discovery-waterfall.module.css';

const DiscoveryWaterfall = ({ images, loading, onLoadMore, category }) => {
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [columnCount, setColumnCount] = useState(2);
  const [heightHistory, setHeightHistory] = useState([]);
  const loadMoreRef = useRef(null);
  const observer = useRef(null);
  const lastScrollY = useRef(0);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || loading || !isVisible) return;
    setLoadingMore(true);
    try {
      await onLoadMore();
      if (images.length > 0 && images.length % 10 !== 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('加载更多失败:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [onLoadMore, loadingMore, hasMore, images.length, loading, isVisible]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || !isVisible) return;
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !loading && isVisible) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '80px' }
    );
    observer.current.observe(loadMoreRef.current);
    return () => { observer.current && observer.current.disconnect(); };
  }, [handleLoadMore, hasMore, loadingMore, loading, isVisible]);

  useEffect(() => {
    setHasMore(true);
    setLoadingMore(false);
    setScrollProgress(0);
    setShowBackToTop(false);
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
      setShowBackToTop(currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollProgress(0);
  }, []);

  const updateColumnCount = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const padding = viewportWidth >= 1200 ? 48 : viewportWidth >= 768 ? 40 : 32;
    const containerWidth = viewportWidth - padding;
    const minColumnWidth = 160;
    const maxColumns = 4;
    const calculatedColumns = Math.floor(containerWidth / minColumnWidth);
    let finalColumns = Math.min(Math.max(calculatedColumns, 2), maxColumns);
    if (images.length > 0 && images.length < finalColumns) {
      finalColumns = Math.min(images.length, 2);
    }
    setColumnCount(finalColumns);
  }, [images.length]);

  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, [updateColumnCount]);

  useEffect(() => {
    if (images.length > 0) {
      const currentHeights = images.map(img => img.height + 80 + 12);
      setHeightHistory(prev => {
        const next = [...prev, ...currentHeights];
        return next.slice(-100);
      });
    }
  }, [images.length]);

  const columnImages = useMemo(() => {
    if (images.length === 0) return Array(columnCount).fill([]);
    const columns = Array(columnCount).fill(null).map(() => []);
    const columnHeights = Array(columnCount).fill(0);
    const calculateCardHeight = (img) => {
      const baseHeight = img.height + 80 + 12;
      if (heightHistory.length > 0) {
        const avg = heightHistory.reduce((a, b) => a + b, 0) / heightHistory.length;
        const variance = heightHistory.reduce((acc, h) => acc + Math.pow(h - avg, 2), 0) / heightHistory.length;
        const std = Math.sqrt(variance);
        const deviation = Math.abs(baseHeight - avg);
        if (deviation > std) {
          const smooth = 0.7;
          return baseHeight * smooth + avg * (1 - smooth);
        }
      }
      return baseHeight;
    };
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const h = calculateCardHeight(img);
      let minHeight = Infinity; let best = 0;
      for (let c = 0; c < columnCount; c++) {
        if (columnHeights[c] < minHeight) { minHeight = columnHeights[c]; best = c; }
      }
      columns[best].push(img);
      columnHeights[best] += h;
    }
    return columns;
  }, [images, columnCount, heightHistory]);

  if (loading && images.length === 0) {
    return <div style={{ padding: 16 }}>加载中...</div>;
  }
  if (!loading && images.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📷</div>
        <div className={styles.emptyTitle}>暂无内容</div>
        <div className={styles.emptyDesc}>{category === 'recommend' ? '推荐内容正在准备中...' : '该分类下暂无图片'}</div>
      </div>
    );
  }

  return (
    <div className={styles.waterfallContainer}>
      <div className={styles.waterfallWrapper} style={{ '--column-count': columnCount, gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
        {columnImages.map((col, idx) => (
          <div key={idx} className={styles.waterfallColumn}>
            {col.map(img => (<ImageCard key={img.id} {...img} />))}
          </div>
        ))}
      </div>
      <div className={styles.infiniteScroll}>
        {hasMore && <div ref={loadMoreRef} style={{ height: '1px' }} />}
        {loadingMore && (
          <div className={styles.loadingMore}>
            <Loading type="spinner" size="18px" className={styles.loadingSpinner}>发现更多精彩内容...</Loading>
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
      </div>
      {showBackToTop && (
        <div className={styles.backToTopButton} onClick={scrollToTop} title={`已浏览 ${Math.round(scrollProgress)}%`}>
          <div className={styles.scrollProgress} style={{ background: `conic-gradient(#1976d2 ${scrollProgress * 3.6}deg, rgba(255,255,255,0.3) 0deg)` }}>
            <div className={styles.backToTopIcon}>↑</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryWaterfall;