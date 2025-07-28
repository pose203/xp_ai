import styles from './loading.module.css';
import { memo } from 'react';

const Loading = ({ children }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div></div>
        <div></div>
      </div>
      {children}
    </>
  )
};

export default memo(Loading);