import styles from './single-column-card-skeleton.module.css';

const SingleColumnCardSkeleton = () => {
  // 为单列布局生成更合适的随机高度
  const randomHeight = Math.floor(Math.random() * 150) + 250; // 250-400px之间，适合单列宽屏显示

  return (
    <div className={styles.skeletonCard}>
      {/* 图片区域骨架 */}
      <div 
        className={styles.skeletonImage} 
        style={{ height: `${randomHeight}px` }}
      />
      
      {/* 内容区域骨架 */}
      <div className={styles.skeletonContent}>
        {/* 标题骨架 - 单列布局可以显示更多行 */}
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonTitleSecond} />
        
        {/* 用户信息骨架 */}
        <div className={styles.skeletonUser}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonUsername} />
        </div>
        
        {/* 统计信息骨架 */}
        <div className={styles.skeletonStats}>
          <div className={styles.skeletonStat} />
          <div className={styles.skeletonStat} />
        </div>
      </div>
    </div>
  );
};

export default SingleColumnCardSkeleton;