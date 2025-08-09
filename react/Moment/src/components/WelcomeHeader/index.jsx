import { useState, useEffect } from 'react';
import { Search, ChatO } from '@react-vant/icons';
import styles from './welcome-header.module.css';

const WelcomeHeader = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('早上好');
    } else if (hour < 18) {
      setGreeting('下午好');
    } else {
      setGreeting('晚上好');
    }
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.topSection}>
        <div className={styles.greetingSection}>
          <h1 className={styles.greeting}>{greeting}</h1>
          <p className={styles.subtitle}>发现精彩世界 ✨</p>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.iconButton}>
            <Search className={styles.icon} />
          </button>
          <button className={styles.iconButton}>
            <ChatO className={styles.icon} />
            <span className={styles.badge}>3</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;