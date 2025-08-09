import { NavBar, Button } from 'react-vant';
import { Search, MoreO } from '@react-vant/icons';
import { useNavigate } from 'react-router-dom';
import ChatList from '../ChatList';
import useTitle from '@/hooks/useTitle';
import styles from './message.module.css';

const Message = () => {
  // 设置页面标题
  useTitle('聊天消息');

  const navigate = useNavigate();

  const handleSearch = () => {
    // TODO: 实现搜索聊天功能
  };

  const handleMore = () => {
    // TODO: 实现更多操作功能
  };

  const startChatWithAI = () => {
    navigate('/chat/ai_doubao');
  };

  return (
    <div className={styles.messageContainer}>
      {/* 顶部导航栏 */}
      <div className={styles.navContainer}>
        <NavBar
          title="聊天"
          rightText={
            <div className={styles.navActions}>
              <Search onClick={handleSearch} className={styles.navIcon} />
              <MoreO onClick={handleMore} className={styles.navIcon} />
            </div>
          }
          className={styles.navbar}
        />
      </div>

      {/* AI聊天快捷入口 */}
      <div className={styles.aiChatContainer}>
        <div className={styles.aiChatCard}>
          <div className={styles.aiChatInfo}>
            <div className={styles.aiAvatar}>🤖</div>
            <div className={styles.aiDetails}>
              <div className={styles.aiName}>小深 AI助手</div>
              <div className={styles.aiDesc}>智能聊天伙伴，随时在线陪你聊天</div>
            </div>
          </div>
          <Button 
            type="primary" 
            size="small"
            onClick={startChatWithAI}
            className={styles.startChatBtn}
          >
            开始聊天
          </Button>
        </div>
      </div>

      {/* 聊天列表 */}
      <div className={styles.chatListContainer}>
        <ChatList />
      </div>
    </div>
  );
};

export default Message;