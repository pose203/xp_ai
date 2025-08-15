import { useState, useEffect } from 'react';
import { Tabbar } from 'react-vant';
import { HomeO, FireO, ChatO, UserCircleO, Edit } from '@react-vant/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './main-layout.module.css';

const tabs = [
  { key: 'home', title: '推荐', icon: <HomeO />, path: '/home' },
  { key: 'discovery', title: '发现', icon: <FireO />, path: '/discovery' },
  { key: 'workshop', title: '创作工坊', icon: <Edit />, path: '/workshop' },
  { key: 'message', title: '聊天', icon: <ChatO />, path: '/message' },
  { key: 'me', title: '我的', icon: <UserCircleO />, path: '/me' },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('home');
  // 监听路由变化，更新当前激活的标签
  useEffect(() => {
    const currentTab = tabs.find(tab => location.pathname.startsWith(tab.path));
    if (currentTab) {
      setActive(currentTab.key);
    }
  }, [location.pathname]);

  // 处理标签切换事件，更新当前激活的标签并导航到对应的路由
  const handleTabChange = (key) => {
    setActive(key);
    const tab = tabs.find(t => t.key === key);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${styles.pageTransition}`}>
        <Outlet />
      </div>
      <Tabbar 
        value={active} 
        onChange={handleTabChange}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--border-color)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          '--rv-tabbar-active-color': 'var(--primary-color)',
          '--rv-tabbar-inactive-color': 'var(--text-muted)',
        }}
      >
        {tabs.map(item => (
          <Tabbar.Item 
            key={item.key} 
            name={item.key} 
            icon={item.icon}
            style={{
              fontSize: '12px',
              fontWeight: active === item.key ? '600' : '400',
              transition: 'all 0.3s ease',
            }}
          >
            {item.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
};

export default MainLayout;
