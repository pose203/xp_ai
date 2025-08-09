import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { Loading } from 'react-vant';
import ImageCard from '../../Home/ImageCard';
import WaterfallSkeleton from '@/components/WaterfallSkeleton';
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

  // 处理无限滚动
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || loading || !isVisible) return;
    
    setLoadingMore(true);
    try {
      await onLoadMore();
      // 如果返回的数据少于期望数量，认为没有更多数据
      if (images.length > 0 && images.length % 10 !== 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('加载更多失败:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [onLoadMore, loadingMore, hasMore, images.length, loading, isVisible]);

  // 设置 Intersection Observer - 智能预加载
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || !isVisible) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !loading && isVisible) {
          handleLoadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '80px' // 提前80px开始加载，平衡性能和体验
      }
    );

    observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleLoadMore, hasMore, loadingMore, loading, isVisible]);

  // 分类变化时重置状态
  useEffect(() => {
    setHasMore(true);
    setLoadingMore(false);
    setScrollProgress(0);
    setShowBackToTop(false);
  }, [category]);

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
      
      // 滚动超过300px时显示回到顶部（发现页内容多，较早显示）
      setShowBackToTop(currentScrollY > 300);
      
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
    setScrollProgress(0);
  }, []);

  // 动态计算列数
  const updateColumnCount = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const padding = viewportWidth >= 1200 ? 48 : viewportWidth >= 768 ? 40 : 32; // 响应式padding
    const containerWidth = viewportWidth - padding;
    const minColumnWidth = 160; // 调整最小列宽
    const maxColumns = 4; // 最大列数
    const calculatedColumns = Math.floor(containerWidth / minColumnWidth);
    
    // 确保至少有2列，但不要超过最大列数
    let finalColumns = Math.min(Math.max(calculatedColumns, 2), maxColumns);
    
    // 如果内容数量少于列数，减少列数以确保每列都有内容
    if (images.length > 0 && images.length < finalColumns) {
      finalColumns = Math.min(images.length, 2); // 至少保持2列
    }
    
    setColumnCount(finalColumns);
  }, [images.length]);

  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, [updateColumnCount]);

  // 更新高度历史数据
  useEffect(() => {
    if (images.length > 0) {
      const currentHeights = images.map(img => {
        const cardContentHeight = 80;
        const margin = 12;
        return img.height + cardContentHeight + margin;
      });
      
      setHeightHistory(prev => {
        const newHistory = [...prev, ...currentHeights];
        return newHistory.slice(-100);
      });
    }
  }, [images.length]);

  // 高级动态平衡算法 - 支持多列且考虑未来元素的最优分配
  const columnImages = useMemo(() => {
    if (images.length === 0) return Array(columnCount).fill([]);
    
    // 初始化列数组和高度数组
    const columns = Array(columnCount).fill(null).map(() => []);
    const columnHeights = Array(columnCount).fill(0);
    
    // 智能预测卡片高度的函数
    const calculateCardHeight = (img) => {
      const cardContentHeight = 80; // 内容区域高度
      const margin = 12; // 间距
      const baseHeight = img.height + cardContentHeight + margin;
      
      // 基于历史数据进行高度预测优化
      if (heightHistory.length > 0) {
        const avgHeight = heightHistory.reduce((a, b) => a + b, 0) / heightHistory.length;
        const variance = heightHistory.reduce((acc, h) => acc + Math.pow(h - avgHeight, 2), 0) / heightHistory.length;
        const stdDev = Math.sqrt(variance);
        
        // 如果当前图片高度偏离平均值较大，应用平滑因子
        const deviation = Math.abs(baseHeight - avgHeight);
        if (deviation > stdDev) {
          const smoothFactor = 0.7; // 平滑因子
          return baseHeight * smoothFactor + avgHeight * (1 - smoothFactor);
        }
      }
      
      return baseHeight;
    };
    
    // 改进的分配算法 - 确保内容均匀分布
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const currentCardHeight = calculateCardHeight(img);
      
      // 找到当前高度最小的列
      let minHeight = Infinity;
      let bestColumn = 0;
      
      for (let col = 0; col < columnCount; col++) {
        if (columnHeights[col] < minHeight) {
          minHeight = columnHeights[col];
          bestColumn = col;
        }
      }
      
      // 将图片添加到高度最小的列
      columns[bestColumn].push(img);
      columnHeights[bestColumn] += currentCardHeight;
    }
    
    // 返回列数据
    return columns;
  }, [images, columnCount, heightHistory]);



  // 如果正在加载且没有数据，显示骨架屏
  if (loading && images.length === 0) {
    return <WaterfallSkeleton count={6} />;
  }

  // 如果没有数据且不在加载中，显示空状态
  if (!loading && images.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📷</div>
        <div className={styles.emptyTitle}>暂无内容</div>
        <div className={styles.emptyDesc}>
          {category === 'recommend' ? '推荐内容正在准备中...' : '该分类下暂无图片'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.waterfallContainer}>
      {/* 多列瀑布流布局 */}
      <div 
        className={styles.waterfallWrapper}
        style={{
          '--column-count': columnCount,
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`
        }}
      >
        {columnImages.map((columnImgs, columnIndex) => (
          <div key={columnIndex} className={styles.waterfallColumn}>
            {columnImgs.map(img => (
              <ImageCard key={img.id} {...img} />
            ))}
          </div>
        ))}
      </div>
      
      {/* 无限滚动触发器 */}
      <div className={styles.infiniteScroll}>
        {/* 观察器目标元素 */}
        {hasMore && <div ref={loadMoreRef} style={{ height: '1px' }} />}
        
        {loadingMore && (
          <div className={styles.loadingMore}>
            <Loading type="spinner" size="18px" className={styles.loadingSpinner}>
              发现更多精彩内容...
            </Loading>
          </div>
        )}
        
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
      </div>

      {/* 回到顶部按钮和滚动进度 */}
      {showBackToTop && (
        <div 
          className={styles.backToTopButton}
          onClick={scrollToTop}
          title={`已浏览 ${Math.round(scrollProgress)}%`}
        >
          <div className={styles.scrollProgress} style={{ 
            background: `conic-gradient(#1976d2 ${scrollProgress * 3.6}deg, rgba(255,255,255,0.3) 0deg)` 
          }}>
            <div className={styles.backToTopIcon}>↑</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryWaterfall;