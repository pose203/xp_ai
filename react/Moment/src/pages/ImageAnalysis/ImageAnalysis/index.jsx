import styles from './imageAnalysis.module.css';

const ImageAnalysis = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>AI 图片文案（简化版）</div>
      <div className={styles.body}>
        <p>该功能为演示用的简化版本，完整功能可后续接入。</p>
        <button className={styles.closeBtn} onClick={onClose}>关闭</button>
      </div>
    </div>
  );
};

export default ImageAnalysis;