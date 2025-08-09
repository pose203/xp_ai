import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import {
  Loading,
  Empty,
  PullRefresh,
  Search
} from 'react-vant';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  Add
} from '@react-vant/icons';
import ChatItem from '../ChatItem';
import { getChatList } from '../../../../mock/chatData.js';
import { LoadingSpinner } from '@/components';
import { useDebounce } from '@/utils/debounce';
import styles from './chat-list.module.css';

const ChatList = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [filteredChatList, setFilteredChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 搜索防抖处理
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  // 加载聊天列表 - 使用useCallback优化
  const loadChatList = useCallback(async () => {
    try {
      const data = await getChatList();
      setChatList(data);
      setFilteredChatList(data);
    } catch (error) {
      console.error('加载聊天列表失败:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 搜索功能 - 使用useCallback优化
  const handleSearch = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);

  // 防抖搜索效果
  useEffect(() => {
    if (!debouncedSearchKeyword.trim()) {
      setFilteredChatList(chatList);
    } else {
      const filtered = chatList.filter(chat => 
        chat.userName.toLowerCase().includes(debouncedSearchKeyword.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(debouncedSearchKeyword.toLowerCase())
      );
      setFilteredChatList(filtered);
    }
  }, [debouncedSearchKeyword, chatList]);

  // 下拉刷新 - 使用useCallback优化
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadChatList();
    setRefreshing(false);
  }, [loadChatList]);

  // 点击聊天项 - 使用useCallback优化
  const handleChatItemClick = useCallback((chat) => {
    const {
      userId,
      userName,
      avatar,
      isOnline,
      bio,
      age,
      location
    } = chat;
    
    navigate(`/chat/${userId}`, { 
      state: { 
        userName,
        avatar,
        isOnline,
        bio,
        age,
        location
      } 
    });
  }, [navigate]);

  useEffect(() => {
    loadChatList();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="加载聊天列表..." />
      </div>
    );
  }

  return (
    <div className={styles.chatListContainer}>
      {/* 搜索栏 */}
      <div className={styles.searchContainer}>
        <Search
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="搜索聊天记录..."
          leftIcon={<SearchIcon />}
          className={styles.searchInput}
          shape="round"
        />
        <button className={styles.addButton}>
          <Add className={styles.addIcon} />
        </button>
      </div>

      <PullRefresh 
        value={refreshing} 
        onRefresh={handleRefresh}
        className={styles.pullRefresh}
      >
        {filteredChatList.length === 0 ? (
          <div className={styles.emptyContainer}>
            <Empty 
              description={searchKeyword ? "没有找到相关聊天" : "暂无聊天记录"} 
              image="https://img.yzcdn.cn/vant/empty-image-default.png"
            />
          </div>
        ) : (
          <div className={styles.chatList}>
            {filteredChatList.map(chat => (
              <ChatItem
                key={chat.id}
                chat={chat}
                onClick={handleChatItemClick}
              />
            ))}
          </div>
        )}
      </PullRefresh>
    </div>
  );
};

export default ChatList;