import React, { useState } from 'react';
import { Search, Tabs, Button } from 'react-vant';
import { DeleteO, ArrowDown } from '@react-vant/icons';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState('搜索文章/课程/标签/用户');
  const [searchValue, setSearchValue] = useState('');

  const tabs = [
    { title: '综合' },
    { title: '文章' },
    { title: '课程' },
    { title: '标签' },
    { title: '用户' }
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
    const placeholders = [
      '搜索文章/课程/标签/用户',
      '搜索文章',
      '搜索课程',
      '搜索标签',
      '搜索用户'
    ];
    setSearchPlaceholder(placeholders[index]);
  };

  const toggleDeleteOptions = () => {
    setShowDeleteOptions(!showDeleteOptions);
  };

  const addToSearchHistory = (value) => {
    if (value.trim()) {
      setSearchHistory(prevHistory => {
        // Remove if already exists to avoid duplicates
        const filteredHistory = prevHistory.filter(item => item !== value.trim());
        // Add as first item
        return [value.trim(), ...filteredHistory];
      });
      console.log('Search submitted with value:', value.trim());
    }
  };
  
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  
  const handleSearch = () => {
    addToSearchHistory(searchValue);
  };
  
  const handleHistoryTagClick = (tag) => {
    setSearchValue(tag);
  };

  const clearSearchHistory = () => {
    console.log('Clearing search history');
    setSearchHistory([]);
    setShowDeleteOptions(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchHeader}>
        <div className={styles.searchWrapper}>
          <Search
            placeholder={searchPlaceholder}
            shape="round"
            className={styles.searchInput}
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <Button 
            className={styles.searchButton}
            type="primary" 
            size="small"
            onClick={handleSearch}
          >
            搜索
          </Button>
        </div>
      </div>
      
      <div className={styles.tabContainer}>
        <Tabs 
          active={activeTab} 
          onChange={handleTabChange}
          lineWidth={20}
          className={styles.tabs}
        >
          {tabs.map((tab, index) => (
            <Tabs.TabPane key={index} title={tab.title} />
          ))}
        </Tabs>
      </div>
      
      <div className={styles.historyContainer}>
        <div className={styles.historyHeader}>
          <div className={styles.historyTitle}>
            搜索历史
            <ArrowDown 
              className={styles.arrowIcon} 
              fontSize="14" 
            />
          </div>
          <div className={styles.historyActions}>
            {showDeleteOptions ? (
              <div className={styles.deleteOptions}>
                <span 
                  className={`${styles.deleteOption} text-red`} 
                  onClick={clearSearchHistory}
                >
                  全部删除
                </span>
                <span className={styles.separator}>|</span>
                <span className={`${styles.deleteOption} text-red`} onClick={toggleDeleteOptions}>
                  完成
                </span>
              </div>
            ) : (
              searchHistory.length > 0 && (
                <DeleteO 
                  className={styles.deleteIcon} 
                  onClick={toggleDeleteOptions}
                />
              )
            )}
          </div>
        </div>
        
        <div className={styles.historyTags}>
          {searchHistory.length === 0 ? (
            <div className={styles.emptyHistory}>暂无搜索历史</div>
          ) : (
            searchHistory.map((item, index) => (
              <div 
                key={index} 
                className={styles.historyTag}
                onClick={() => handleHistoryTagClick(item)}
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 