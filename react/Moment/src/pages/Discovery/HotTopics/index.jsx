import { Tag } from 'react-vant';
import { FireO } from '@react-vant/icons';
import styles from './hot-topics.module.css';

const HotTopics = () => {
  const topics = [
    { id: 1, name: '每日摄影', heat: '12.3w', color: '#ff4757' },
    { id: 2, name: '城市风光', heat: '8.7w', color: '#5352ed' },
    { id: 3, name: '美食日记', heat: '15.2w', color: '#ff9ff3' },
    { id: 4, name: '旅行记录', heat: '6.8w', color: '#3742fa' },
    { id: 5, name: '生活随拍', heat: '9.1w', color: '#2ed573' },
    { id: 6, name: '人像摄影', heat: '11.4w', color: '#ffa502' },
    { id: 7, name: '自然风景', heat: '7.3w', color: '#ff6348' },
    { id: 8, name: '街头艺术', heat: '4.9w', color: '#747d8c' }
  ];

  const handleTopicClick = () => {};

  return (
    <div className={styles.topicsContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FireO className={styles.titleIcon} />
          <span>热门话题</span>
        </div>
        <span className={styles.moreText}>查看更多</span>
      </div>
      
      <div className={styles.topicsGrid}>
        {topics.map(topic => (
          <div key={topic.id} className={styles.topicItem} onClick={() => handleTopicClick(topic)}>
            <Tag color={topic.color} size="medium" className={styles.topicTag}>
              #{topic.name}
            </Tag>
            <span className={styles.topicHeat}>{topic.heat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotTopics;