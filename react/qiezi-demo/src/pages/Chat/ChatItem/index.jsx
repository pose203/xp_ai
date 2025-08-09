import {
  useMemo,
  useCallback
} from 'react';
import {
  Image,
  Badge
} from 'react-vant';
import { formatRelativeTime } from '@/utils/dateUtils';
import styles from './chat-item.module.css';

const ChatItem = ({ chat, onClick }) => {
  // 使用useMemo优化时间格式化
  const formattedTime = useMemo(() => 
    formatRelativeTime(chat.lastMessageTime), 
    [chat.lastMessageTime]
  );

  // 使用useCallback优化点击事件
  const handleClick = useCallback(() => {
    onClick(chat);
  }, [chat, onClick]);

  return (
    <div className={styles.chatItem} onClick={handleClick}>
      <div className={styles.avatarContainer}>
        <Image
          round
          width="50"
          height="50"
          src={chat.avatar}
          className={styles.avatar}
        />
        {chat.isOnline && <div className={styles.onlineStatus} />}
      </div>
      
      <div className={styles.chatContent}>
        <div className={styles.chatHeader}>
          <span className={styles.userName}>{chat.userName}</span>
          <span className={styles.time}>{formattedTime}</span>
        </div>
        
        <div className={styles.chatBody}>
          <div className={styles.lastMessage}>{chat.lastMessage}</div>
          {chat.unreadCount > 0 && (
            <Badge 
              content={chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              className={styles.unreadBadge}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;