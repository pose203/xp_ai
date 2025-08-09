import React from 'react';
import styles from './tabbar.module.css';

const TabBar = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`${styles.tabBar} ${className}`}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${styles.tabItem} ${
              activeTab === tab.key ? styles.active : ''
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            <span className={styles.tabText}>{tab.label}</span>
            {activeTab === tab.key && <div className={styles.activeIndicator} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;