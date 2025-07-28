import React from 'react';
import Header from '../../components/Header';
import CategoryNav from '../../components/CategoryNav';
import ArticleList from '../../components/ArticleList';
import styles from './index.module.css';

const Home = () => {
  return (
    <div>
      <Header />
      <CategoryNav />
      <main className={styles.mainContainer}>
        <div className={styles.timelineIndexView}>
          <div className={styles.timelineContainer}>
            <ArticleList />
          </div>
        </div>
      </main>
      <div className={styles.openButton}>
        APP内打开
      </div>
    </div>
  );
};

export default Home; 