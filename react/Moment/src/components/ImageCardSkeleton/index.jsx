import styles from './skeleton.module.css';

const ImageCardSkeleton = () => {
  // 随机生成不同高度的骨架屏，模拟瀑布流效果
  const randomHeight = Math.floor(Math.random() * 100) + 200; // 200-300px之间

  return (
    <div className={styles.skeletonCard}>
      {/* 图片区域骨架 */}
      <div 
        className={styles.skeletonImage} 
        style={{ height: `${randomHeight}px` }}
      />
      
      {/* 内容区域骨架 */}
      <div className={styles.skeletonContent}>
        {/* 标题骨架 */}
        <div className={styles.skeletonTitle} />
        
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

export default ImageCardSkeleton;