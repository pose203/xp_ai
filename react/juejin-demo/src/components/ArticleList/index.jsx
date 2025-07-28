import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticleStore } from '../../store';
import styles from './index.module.css';

const ArticleList = () => {
  const { articles, fetchArticles } = useArticleStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className={styles.articleList}>
      {articles.map(article => (
        <div key={article.id} className={styles.articleItem}>
          {article.cover ? (
            <div className={styles.withCover}>
              <div className={styles.withCoverContent}>
                <div className={styles.articleTitle}>
                  <Link to={`/post/${article.id}`} className={styles.titleLink}>
                    {article.title}
                  </Link>
                </div>
                <div className={styles.articleExcerpt}>
                  {article.excerpt}
                </div>
                <div className={styles.articleMeta}>
                  <div className={styles.metaItem}>{article.author}</div>
                  <div className={styles.metaItem}>{article.time}</div>
                  <div className={styles.metaItem}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2C3 2 0 6 0 6C0 6 3 10 6 10C9 10 12 6 12 6C12 6 9 2 6 2Z" fill="#86909C"/>
                      <circle cx="6" cy="6" r="2" fill="#86909C"/>
                    </svg>
                    <span>{article.views}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 12L5.15 11.23C2.04 8.46 0 6.64 0 4.48C0 2.66 1.44 1.2 3.24 1.2C4.26 1.2 5.24 1.68 6 2.4C6.76 1.68 7.74 1.2 8.76 1.2C10.56 1.2 12 2.66 12 4.48C12 6.64 9.96 8.46 6.85 11.23L6 12Z" fill="#86909C"/>
                    </svg>
                    <span>{article.likes}</span>
                  </div>
                </div>
              </div>
              <div className={styles.articleCover}>
                <img src={article.cover} alt={article.title} className={styles.coverImg} />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.articleTitle}>
                <Link to={`/post/${article.id}`} className={styles.titleLink}>
                  {article.title}
                </Link>
              </div>
              <div className={styles.articleExcerpt}>
                {article.excerpt}
              </div>
              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>{article.author}</div>
                <div className={styles.metaItem}>{article.time}</div>
                <div className={styles.metaItem}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2C3 2 0 6 0 6C0 6 3 10 6 10C9 10 12 6 12 6C12 6 9 2 6 2Z" fill="#86909C"/>
                    <circle cx="6" cy="6" r="2" fill="#86909C"/>
                  </svg>
                  <span>{article.views}</span>
                </div>
                <div className={styles.metaItem}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 12L5.15 11.23C2.04 8.46 0 6.64 0 4.48C0 2.66 1.44 1.2 3.24 1.2C4.26 1.2 5.24 1.68 6 2.4C6.76 1.68 7.74 1.2 8.76 1.2C10.56 1.2 12 2.66 12 4.48C12 6.64 9.96 8.46 6.85 11.23L6 12Z" fill="#86909C"/>
                  </svg>
                  <span>{article.likes}</span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticleList; 