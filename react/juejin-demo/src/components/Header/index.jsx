import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store';
import styles from './index.module.css';

const Header = () => {
  const { isLoggedIn, userInfo } = useUserStore();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img 
            src="//lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" 
            alt="稀土掘金" 
            className={styles.logoImg} 
          />
          <img 
            src="//lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg" 
            alt="稀土掘金" 
            className={styles.mobile} 
          />
        </Link>

        <div className={styles.searchBox}>
          <input type="text" placeholder="探索稀土掘金" className={styles.searchInput} />
          <div className={styles.searchIconContainer}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.4208 8.4208C10.0985 6.74312 10.0985 4.0399 8.4208 2.36223C6.74312 0.684559 4.0399 0.684559 2.36223 2.36223C0.684559 4.0399 0.684559 6.74312 2.36223 8.4208C4.0399 10.0985 6.74312 10.0985 8.4208 8.4208ZM8.4208 8.4208L14.25 14.25" stroke="#86909C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>

        <nav role="navigation" className={styles.mainNav}>
          <ul className={styles.navList}>
            <li className={styles.mainNavList}>
              <div className={styles.phoneShowMenu}>
                <span>首页</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="unfold16-icon">
                  <path d="M2.45025 4.82431C2.17422 4.49957 2.40501 4.00049 2.83122 4.00049H9.16878C9.59498 4.00049 9.82578 4.49957 9.54975 4.82431L6.38097 8.55229C6.1813 8.78719 5.8187 8.78719 5.61903 8.55229L2.45025 4.82431Z"></path>
                </svg>
              </div>
              <ul className={styles.phoneHide}>
                <li className={`${styles.navItem} ${styles.active}`}>
                  <Link to="/">首页</Link>
                </li>
                <li className={styles.navItem}>
                  <a href="https://aicoding.juejin.cn" target="_blank" rel="noopener noreferrer">
                    AI Coding
                    <span className={styles.newFont}>NEW</span>
                  </a>
                </li>
                <li className={styles.navItem}>
                  <Link to="/pins">沸点</Link>
                </li>
                <li className={styles.navItem}>
                  <Link to="/course">课程</Link>
                </li>
                <li className={styles.navItem}>
                  <Link to="/live">直播</Link>
                </li>
                <li className={styles.navItem}>
                  <Link to="/events/all">活动</Link>
                </li>
                <li className={styles.navItem}>
                  <Link to="/problemset">AI刷题</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className={styles.userActions}>
          <div className={styles.notificationIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20C13.1 20 14 19.1 14 18H10C10 19.1 10.9 20 12 20ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#86909C"/>
            </svg>
          </div>
          {isLoggedIn ? (
            <div className={styles.userAvatar}>
              <img 
                src={userInfo?.avatar || "https://p26-passport.byteacctimg.com/img/user-avatar/eb89fdd1e22be65b7b34276b598265e9~300x300.image"} 
                alt="用户头像" 
              />
            </div>
          ) : (
            <Link to="/login" className={styles.navItem}>登录</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 