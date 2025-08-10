import ImageCardSkeleton from '@/components/ImageCardSkeleton';
import styles from './skeleton.module.css';

const WaterfallSkeleton = ({ count = 6 }) => {
  // 生成指定数量的骨架屏卡片
  const skeletonCards = Array.from({ length: count }, (_, index) => (
    <ImageCardSkeleton key={`skeleton-${index}`} />
  ));

  // 将骨架屏卡片分配到两列
  const leftColumn = skeletonCards.filter((_, index) => index % 2 === 0);
  const rightColumn = skeletonCards.filter((_, index) => index % 2 === 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        {leftColumn}
      </div>
      <div className={styles.column}>
        {rightColumn}
      </div>
    </div>
  );
};

export default WaterfallSkeleton;