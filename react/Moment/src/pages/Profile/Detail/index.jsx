import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDetailStore } from '@/store/useDetailStore';
import { Skeleton, Image, Divider } from 'react-vant';
import { ArrowLeft } from '@react-vant/icons';
import styles from './detail.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, loading, fetchDetail, clearDetail } = useDetailStore();

  useEffect(() => {
    fetchDetail(id);

    // 组件卸载时清理详情数据
    return () => {
      clearDetail();
    };
  }, [id, fetchDetail, clearDetail]);

  if (loading || !detail) {
    return (
      <div className={styles.container}>
        <Skeleton title avatar row={5} />
      </div>
    );
  }

  const { url, title, content, author, comments } = detail;

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="返回上一页"
          type="button"
        >
          <ArrowLeft size={24} aria-hidden="true" />
        </button>
        <span>详情</span>
      </nav>
      <Image src={url} alt={title} className={styles.mainImage} />
      
      <div className={styles.authorInfo}>
        <Image src={author.avatar} round className={styles.avatar} />
        <span className={styles.authorName}>{author.name}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.content}>{content}</p>

      <Divider>评论区</Divider>

      <div className={styles.commentsSection}>
        {comments.map(comment => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <Image src={comment.avatar} round className={styles.commentAvatar} />
              <strong className={styles.commentUser}>{comment.user}</strong>
            </div>
            <span className={styles.commentText}>{comment.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
