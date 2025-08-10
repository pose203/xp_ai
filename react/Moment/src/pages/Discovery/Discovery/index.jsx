import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import {
  NavBar,
  Search as SearchInput,
  Tabs,
  PullRefresh,
  Loading
} from 'react-vant';
import {
  Search,
  Fire,
  Star,
  UserO,
  Photo,
  Like,
  Smile
} from '@react-vant/icons';
import DiscoveryWaterfall from '../DiscoveryWaterfall';
import HotTopics from '../HotTopics';
import RecommendUsers from '../../Home/RecommendUsers';
import CategoryTabs from '../CategoryTabs';
import { useImageStore } from '@/store/useImageStore';
import { useDebounce } from '@/utils/debounce';
import useTitle from '@/hooks/useTitle';
import styles from './discovery.module.css';

const Discovery = () => {
  // 设置页面标题
  useTitle('发现精彩');

  const [activeTab, setActiveTab] = useState('recommend');
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 搜索防抖处理
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  
  const {
    images,
    loading,
    fetchImages,
    switchCategory
  } = useImageStore();

  // 页面分类配置 - 使用useMemo优化
  const categories = useMemo(() => [
    {
      key: 'recommend',
      title: '推荐',
      icon: <Fire />,
      gradient: 'linear-gradient(135deg, #e6a679, #d4946c)'
    },
    {
      key: 'photography',
      title: '摄影',
      icon: <Photo />,
      gradient: 'linear-gradient(135deg, #c8a78a, #b89a7a)'
    },
    {
      key: 'lifestyle',
      title: '生活',
      icon: <Smile />,
      gradient: 'linear-gradient(135deg, #dbb08a, #c29574)'
    },
    {
      key: 'nature',
      title: '风景',
      icon: <Like />,
      gradient: 'linear-gradient(135deg, #d4a885, #c2a385)'
    },
    {
      key: 'food',
      title: '美食',
      icon: <Star />,
      gradient: 'linear-gradient(135deg, #e5b085, #d4946c)'
    },
    {
      key: 'travel',
      title: '旅行',
      icon: <UserO />,
      gradient: 'linear-gradient(135deg, #ddb28a, #c8a78a)'
    }
  ], []);

  // 初始化数据
  useEffect(() => {
    fetchImages(activeTab);
  }, []);

  // 切换分类 - 使用useCallback优化
  const handleTabChange = useCallback(async (key) => {
    if (key === activeTab) return;
    setActiveTab(key);
    await switchCategory(key);
  }, [activeTab, switchCategory]);

  // 下拉刷新 - 使用useCallback优化
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await switchCategory(activeTab);
    } finally {
      setRefreshing(false);
    }
  }, [activeTab, switchCategory]);

  // 搜索功能 - 使用useCallback优化
  const handleSearch = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);

  // 防抖搜索效果 - 当debouncedSearchKeyword变化时执行实际搜索
  useEffect(() => {
    if (debouncedSearchKeyword) {
      console.log('执行搜索:', debouncedSearchKeyword);
      // 实现搜索逻辑（待开发具体API）
    }
  }, [debouncedSearchKeyword]);

  // 加载更多 - 使用useCallback优化
  const handleLoadMore = useCallback(() => {
    if (!loading) {
      fetchImages(activeTab);
    }
  }, [loading, activeTab, fetchImages]);

  return (
    <div className={styles.discoveryContainer}>
      {/* 顶部导航栏 */}
      <div className={styles.navContainer}>
        <NavBar
          title="发现"
          rightText={
            <div className={styles.navActions}>
              <Search 
                onClick={() => {
                  setShowSearch(!showSearch);

                }} 
                className={`${styles.navIcon} ${showSearch ? styles.navIconActive : ''}`}
              />
            </div>
          }
          className={styles.navbar}
        />
      </div>

      {/* 搜索栏 */}
      {showSearch && (
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <SearchInput
              value={searchKeyword}
              onChange={setSearchKeyword}
              onSearch={handleSearch}
              placeholder="搜索图片、用户、话题..."
              className={styles.searchInput}
            />
            <button 
              className={styles.searchCloseBtn}
              onClick={() => {
                setShowSearch(false);

                setSearchKeyword('');
              }}
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 下拉刷新容器 */}
      <PullRefresh
        loading={refreshing}
        onRefresh={handleRefresh}
        className={styles.refreshContainer}
      >
        {/* 分类标签 */}
        <div className={`${styles.categorySection} ${showSearch ? styles.categorySectionWithSearch : ''}`}>
          <CategoryTabs
            categories={categories}
            activeKey={activeTab}
            onChange={handleTabChange}
          />
        </div>

        {/* 推荐内容区域 */}
        {activeTab === 'recommend' && (
          <>
            {/* 热门话题 */}
            <div className={styles.topicsSection}>
              <HotTopics />
            </div>

            {/* 推荐用户 */}
            <div className={styles.usersSection}>
              <RecommendUsers />
            </div>
          </>
        )}

        {/* 图片瀑布流 */}
        <div className={styles.waterfallSection}>
          <DiscoveryWaterfall
            images={images}
            loading={loading}
            onLoadMore={handleLoadMore}
            category={activeTab}
          />
        </div>
      </PullRefresh>
    </div>
  );
};

export default Discovery;