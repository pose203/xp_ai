import { useNavigate } from 'react-router-dom';
import { PlayCircleO, StarO, UserCircleO } from '@react-vant/icons';
import styles from './image-card.module.css';

const ImageCard = (props) => {
  const { 
    id, 
    url, 
    title, 
    author, 
    viewCount, 
    likeCount, 
    duration,
    category,
    isVideo = false,
    singleColumn = false
  } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

  const formatCount = (count) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return null;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`${styles.card} ${singleColumn ? styles.singleColumnCard : ''}`}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <img 
          src={url} 
          alt={title || ''} 
          className={styles.image}
        />
        
        {isVideo && (
          <div className={styles.videoOverlay}>
            <PlayCircleO className={styles.playIcon} />
            {duration && (
              <span className={styles.duration}>
                {formatDuration(duration)}
              </span>
            )}
          </div>
        )}

        {category && (
          <div className={styles.categoryTag}>
            {category}
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>
          {title}
        </div>

        <div className={styles.cardMeta}>
          <div className={styles.authorInfo}>
            <UserCircleO className={styles.authorIcon} />
            <span className={styles.authorName}>{typeof author === 'string' ? author : author?.name || '匿名用户'}</span>
          </div>
          <div className={styles.moreIcon}>⋯</div>
        </div>

        <div className={styles.cardStats}>
          <div className={styles.stat}>
            <PlayCircleO className={styles.statIcon} />
            <span>{formatCount(viewCount || 0)}</span>
          </div>
          <div className={styles.stat}>
            <StarO className={styles.statIcon} />
            <span>{formatCount(likeCount || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;