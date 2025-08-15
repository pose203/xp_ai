import styles from './loading-spinner.module.css';
// 用 CSS Modules 渲染三段跳的圆点动画，并可附带提示文案
const LoadingSpinner = ({ size = 'medium', color = 'primary', text = '加载中...' }) => {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={`${styles.spinner} ${styles[color]}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;