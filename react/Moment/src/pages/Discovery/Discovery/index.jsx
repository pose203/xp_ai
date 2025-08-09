import { useState, useEffect, useMemo, useCallback } from 'react';
import { NavBar, Search as SearchInput, PullRefresh } from 'react-vant';
import { Search as SearchIcon, Fire, Star, UserO, Photo, Like, Smile } from '@react-vant/icons';
import DiscoveryWaterfall from '../DiscoveryWaterfall';
import HotTopics from '../HotTopics';
import RecommendUsers from '../../Home/RecommendUsers';
import CategoryTabs from '../CategoryTabs';
import { useImageStore } from '@/store/useImageStore';
import { useDebounce } from '@/utils/debounce';
import useTitle from '@/hooks/useTitle';
import styles from './discovery.module.css';

const Discovery = () => {
  useTitle('发现精彩');

  const [activeTab, setActiveTab] = useState('recommend');
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const { images, loading, fetchImages, switchCategory } = useImageStore();

  const categories = useMemo(() => [
    { key: 'recommend', title: '推荐', icon: <Fire />, gradient: 'linear-gradient(135deg, #e6a679, #d4946c)' },
    { key: 'photography', title: '摄影', icon: <Photo />, gradient: 'linear-gradient(135deg, #c8a78a, #b89a7a)' },
    { key: 'lifestyle', title: '生活', icon: <Smile />, gradient: 'linear-gradient(135deg, #dbb08a, #c29574)' },
    { key: 'nature', title: '风景', icon: <Like />, gradient: 'linear-gradient(135deg, #d4a885, #c2a385)' },
    { key: 'food', title: '美食', icon: <Star />, gradient: 'linear-gradient(135deg, #e5b085, #d4946c)' },
    { key: 'travel', title: '旅行', icon: <UserO />, gradient: 'linear-gradient(135deg, #ddb28a, #c8a78a)' }
  ], []);

  useEffect(() => {
    fetchImages(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = useCallback(async (key) => {
    if (key === activeTab) return;
    setActiveTab(key);
    await switchCategory(key);
  }, [activeTab, switchCategory]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await switchCategory(activeTab);
    } finally {
      setRefreshing(false);
    }
  }, [activeTab, switchCategory]);

  const handleSearch = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);

  useEffect(() => {
    if (debouncedSearchKeyword) {
      // TODO: 接入搜索接口
      // console.log('执行搜索:', debouncedSearchKeyword);
    }
  }, [debouncedSearchKeyword]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      fetchImages(activeTab);
    }
  }, [loading, activeTab, fetchImages]);

  return (
    <div className={styles.discoveryContainer}>
      <div className={styles.navContainer}>
        <NavBar
          title="发现"
          rightText={
            <div className={styles.navActions}>
              <SearchIcon 
                onClick={() => setShowSearch(!showSearch)}
                className={`${styles.navIcon} ${showSearch ? styles.navIconActive : ''}`}
              />
            </div>
          }
          className={styles.navbar}
        />
      </div>

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
            <button className={styles.searchCloseBtn} onClick={() => { setShowSearch(false); setSearchKeyword(''); }}>
              取消
            </button>
          </div>
        </div>
      )}

      <PullRefresh loading={refreshing} onRefresh={handleRefresh} className={styles.refreshContainer}>
        <div className={`${styles.categorySection} ${showSearch ? styles.categorySectionWithSearch : ''}`}>
          <CategoryTabs categories={categories} activeKey={activeTab} onChange={handleTabChange} />
        </div>

        {activeTab === 'recommend' && (
          <>
            <div className={styles.topicsSection}>
              <HotTopics />
            </div>
            <div className={styles.usersSection}>
              <RecommendUsers />
            </div>
          </>
        )}

        <div className={styles.waterfallSection}>
          <DiscoveryWaterfall images={images} loading={loading} onLoadMore={handleLoadMore} category={activeTab} />
        </div>
      </PullRefresh>
    </div>
  );
};

export default Discovery;