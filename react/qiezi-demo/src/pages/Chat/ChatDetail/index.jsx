import {
  useState,
  useCallback
} from 'react';
import {
  NavBar,
  Image,
  ActionSheet
} from 'react-vant';
import {
  ArrowLeft,
  MoreO,
  PhoneO,
  VideoO
} from '@react-vant/icons';
import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
import ChatInterface from '../ChatInterface';
import styles from './chat-detail.module.css';

const ChatDetail = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  // 从路由state中获取用户信息
  const userInfo = location.state || {
    userName: '用户',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
    isOnline: false,
    bio: '',
    age: 0,
    location: ''
  };

  // 返回上一页
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 语音通话
  const handleVoiceCall = useCallback(() => {
    // 实现语音通话功能（待开发）
  }, []);

  // 视频通话
  const handleVideoCall = useCallback(() => {
    // 实现视频通话功能（待开发）
  }, []);

  // 更多操作
  const handleMoreActions = useCallback(() => {
    setShowActions(true);
  }, []);

  // 操作菜单项
  const actionItems = [
    { name: '查看资料', key: 'profile' },
    { name: '清空聊天记录', key: 'clear' },
    { name: '举报用户', key: 'report' },
    { name: '删除聊天', key: 'delete', color: '#ff4757' },
  ];

  // 处理操作选择
  const handleActionSelect = (action) => {
    setShowActions(false);
    
    switch (action.key) {
      case 'profile':
        // TODO: 跳转到用户资料页面
        break;
      case 'clear':
        // TODO: 实现清空聊天记录
        break;
      case 'report':
        // TODO: 实现举报功能
        break;
      case 'delete':
        // TODO: 实现删除聊天功能
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.chatDetailContainer}>
      {/* 顶部导航栏 */}
      <div className={styles.navContainer}>
        <NavBar
          title={
            <div className={styles.navTitle}>
              <div className={styles.userInfo}>
                <Image
                  round
                  width="32"
                  height="32"
                  src={userInfo.avatar}
                  className={styles.navAvatar}
                />
                <div className={styles.userDetails}>
                  <div className={styles.userName}>{userInfo.userName}</div>
                  <div className={styles.userStatus}>
                    {userId === 'ai_doubao' ? (
                      <span className={styles.aiStatus}>AI助手 • 随时在线</span>
                    ) : userInfo.isOnline ? (
                      <span className={styles.onlineStatus}>在线</span>
                    ) : (
                      <span className={styles.offlineStatus}>离线</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
          leftText={<ArrowLeft />}
          onClickLeft={handleBack}
          rightText={
            userId === 'ai_doubao' ? (
              <div className={styles.navActions}>
                <MoreO onClick={handleMoreActions} className={styles.navIcon} />
              </div>
            ) : (
              <div className={styles.navActions}>
                <PhoneO onClick={handleVoiceCall} className={styles.navIcon} />
                <VideoO onClick={handleVideoCall} className={styles.navIcon} />
                <MoreO onClick={handleMoreActions} className={styles.navIcon} />
              </div>
            )
          }
          className={styles.navbar}
        />
      </div>

      {/* 聊天界面 */}
      <div className={styles.chatContainer}>
        <ChatInterface userId={userId} userInfo={userInfo} />
      </div>

      {/* 操作菜单 */}
      <ActionSheet
        visible={showActions}
        onCancel={() => setShowActions(false)}
        actions={actionItems}
        onSelect={handleActionSelect}
        cancelText="取消"
      />
    </div>
  );
};

export default ChatDetail;