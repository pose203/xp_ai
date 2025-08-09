import { useState } from 'react';
import { Image, ActionSheet, Loading } from 'react-vant';
import {
  StarO,
  LikeO,
  SettingO,
  ServiceO,
  ClockO,
  FriendsO,
  CashierO,
  ShopO,
  PlayCircleO,
  Edit,
  Lock
} from '@react-vant/icons';
// 统一AI工具 - 自动切换真实API和Mock版本
import { generateAvatar, generatePersonalizedPrompt } from '@/utils/ai-unified';
import { checkAPIConfig, testAPIConnection } from '@/utils/config-checker';
import UniversalImageUpload from '../../ImageAnalysis/UniversalImageUpload';
import LoginForm from '../LoginForm';
import { useAvatarUpload } from '@/hooks/useImageUpload';
import { useUserStore } from '@/store/useUserStore';
import useTitle from '@/hooks/useTitle';
import styles from './me.module.css';

const Me = () => {
  // 设置页面标题
  useTitle('个人资料');

  // 使用全局用户状态
  const { isLoggedIn, userInfo, login, register, logout, updateUserInfo } = useUserStore();

  // 使用头像上传Hook
  const {
    avatar,
    showAvatarUpload,
    updateAvatar,
    openAvatarUpload,
    closeAvatarUpload,
    handleAvatarChange
  } = useAvatarUpload(userInfo?.avatar);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 显示消息函数（替代Toast，避免React 19兼容性问题）
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // 处理登录成功
  const handleLoginSuccess = () => {
    showMessage('success', '欢迎使用遇见！');
  };

  // 处理登出
  const handleLogout = () => {
    logout();
    showMessage('success', '已退出登录');
  };

  // 统计数据
  const statsData = [
    { label: '获赞', value: userInfo?.totalLikes || 0, color: '#ff4757' },
    { label: '关注', value: userInfo?.following || 0, color: '#5352ed' },
    { label: '粉丝', value: userInfo?.followers || 0, color: '#ff9ff3' }
  ];

  // 九宫格菜单数据
  const gridMenuItems = [
    { title: '我的照片', icon: <PlayCircleO />, count: '23', isLink: true },
    { title: '相册', icon: <Edit />, count: '5', isLink: true },
    { title: '我的收藏', icon: <StarO />, count: '128', isLink: true },
    { title: '浏览记录', icon: <ClockO />, count: '', isLink: true },
    { title: '我的关注', icon: <FriendsO />, count: userInfo?.following || 0, isLink: true },
    { title: '钱包', icon: <CashierO />, count: '', isLink: true },
    { title: '商城', icon: <ShopO />, count: '', isLink: true },
    { title: '客服', icon: <ServiceO />, count: '', isLink: true },
    { title: '退出登录', icon: <Lock />, count: '', isLink: true, action: 'logout' }
  ];

  // 处理头像操作
  const handleAvatarAction = async (action) => {
    setShowActionSheet(false);
    
    switch (action.name) {
      case 'AI生成头像':
        await handleGenerateAvatar();
        break;
      case '从相册选择':
        openAvatarUpload();
        break;
      default:
        break;
    }
  };

  // 预加载图片以避免加载卡顿
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      // 检查是否在浏览器环境中
      if (typeof window === 'undefined' || typeof Image === 'undefined') {
        // 在服务端或 Image 不可用时直接返回成功
        resolve(url);
        return;
      }
      
      try {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => {
          console.warn('图片预加载失败:', url);
          resolve(url); // 即使预加载失败也返回成功，继续执行
        };
        img.src = url;
      } catch (error) {
        console.warn('创建Image对象失败:', error);
        resolve(url); // 出错时也返回成功
      }
    });
  };

  // AI生成头像
  const handleGenerateAvatar = async () => {
    setIsGeneratingAvatar(true);
    
    try {
      // 检查API配置

      checkAPIConfig();
      
      const connectionTest = await testAPIConnection();
      if (!connectionTest.success) {
        showMessage('error', connectionTest.message);
        return;
      }
      
              const prompt = generatePersonalizedPrompt(userInfo);
      
      const result = await generateAvatar(prompt);
      
      if (result.status === 0 && result.avatar) {
        
        
        try {
          // 预加载新头像，避免加载卡顿
          await preloadImage(result.avatar);
          
          // 使用requestAnimationFrame确保平滑更新
          requestAnimationFrame(() => {
            // 批量更新状态，减少重渲染
            updateAvatar(result.avatar);
            updateUserInfo({ avatar: result.avatar });
            showMessage('success', '头像生成成功！');
          });
          
          
        } catch (preloadError) {
          console.warn('头像预加载失败，直接更新:', preloadError);
          // 即使预加载失败，也要更新头像
          updateAvatar(result.avatar);
          updateUserInfo({ avatar: result.avatar });
          showMessage('success', '头像生成成功！');
        }
      } else {
        showMessage('error', result.msg || '生成头像失败');
        console.error('❌ 头像生成失败:', result);
      }
    } catch (error) {
      console.error('❌ 生成头像出错:', error);
      showMessage('error', '生成头像失败，请重试');
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  // 处理头像选择完成
  const handleAvatarChangeComplete = (images) => {
    if (images && images.length > 0) {
      const newAvatarUrl = images[0].url;
      handleAvatarChange(images);
      updateUserInfo({ avatar: newAvatarUrl });
    }
  };

  const actions = [
    { name: 'AI生成头像', color: '#1976d2' },
    { name: '从相册选择', color: '#1976d2' }
  ];

  const formatNumber = (num) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    }
    return num.toString();
  };



  // 已登录状态的界面
  const renderUserView = () => (
    <div className={styles.container}>
      {/* 消息提示区域 */}
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {/* 用户信息区域 */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            <Image
              round
              width="80"
              height="80"
              src={avatar || userInfo?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face'}
              className={styles.avatar}
              onClick={() => setShowActionSheet(true)}
              lazy={false}
              fit="cover"
            />
            {isGeneratingAvatar && (
              <div className={styles.avatarLoading}>
                <div className={styles.loadingSpinner}></div>
              </div>
            )}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.nickname}>
              {userInfo?.nickname || userInfo?.username || '用户'}
              <span className={styles.level}>{userInfo?.level || 'Lv.1'}</span>
            </div>
            <div className={styles.signature}>
              {userInfo?.signature || '这个用户很懒，还没有设置签名'}
            </div>
            <div className={styles.editProfile}>编辑资料</div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className={styles.statsSection}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue} style={{ color: stat.color }}>
                {formatNumber(stat.value)}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 九宫格功能菜单 */}
      <div className={styles.gridContainer}>
        <div className={styles.gridMenu}>
          {gridMenuItems.map((item, index) => (
            <div 
              key={index} 
              className={styles.gridItem}
              onClick={() => {
                if (item.action === 'logout') {
                  handleLogout();
                } else {
                  // 这里可以添加其他功能的点击处理逻辑
            
                }
              }}
            >
              <div className={styles.gridIcon}>
                {item.icon}
              </div>
              <div className={styles.gridTitle}>{item.title}</div>
              {item.count && (
                <div className={styles.gridCount}>{item.count}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <LoginForm 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <>
      {renderUserView()}
      
      {/* 头像操作弹窗 */}
      <ActionSheet
        visible={showActionSheet}
        actions={actions}
        cancelText="取消"
        onCancel={() => setShowActionSheet(false)}
        onSelect={handleAvatarAction}
      />

      {/* 头像上传组件 */}
      <UniversalImageUpload
        visible={showAvatarUpload}
        onClose={closeAvatarUpload}
        onImagesChange={handleAvatarChangeComplete}
        uploadType="avatar"
        mode="modal"
      />

      {/* AI生成头像的loading状态 */}
      {isGeneratingAvatar && (
        <div className={styles.loadingOverlay}>
          <Loading type="spinner" size="24px" color="#1976d2">
            AI正在为您生成专属头像...
          </Loading>
        </div>
      )}
    </>
  );
};

export default Me;