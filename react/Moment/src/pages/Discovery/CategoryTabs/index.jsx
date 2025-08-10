import { Tabs } from 'react-vant';
import styles from './category-tabs.module.css';

const CategoryTabs = ({ categories, activeKey, onChange }) => {
  return (
    <div className={styles.categoryContainer}>
      <Tabs
        active={activeKey}
        onChange={onChange}
        type="card"
        className={styles.categoryTabs}
        scrollable
      >
        {categories.map(category => (
          <Tabs.TabPane
            key={category.key}
            title={
              <div className={styles.tabTitle}>
                <span className={styles.tabIcon}>{category.icon}</span>
                <span className={styles.tabText}>{category.title}</span>
              </div>
            }
            name={category.key}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;