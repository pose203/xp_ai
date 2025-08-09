import SingleColumnCardSkeleton from '@/components/SingleColumnCardSkeleton';
import styles from './single-column-skeleton.module.css';

const SingleColumnSkeleton = ({ count = 3 }) => {
  // 生成指定数量的单列骨架屏卡片
  const skeletonCards = Array.from({ length: count }, (_, index) => (
    <SingleColumnCardSkeleton key={`single-skeleton-${index}`} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.skeletonList}>
        {skeletonCards}
      </div>
    </div>
  );
};

export default SingleColumnSkeleton;