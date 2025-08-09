import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - Moment`;
    }
    
    // 清理函数，重置为默认标题
    return () => {
      document.title = 'Moment';
    };
  }, [title]);
};

export default useTitle;