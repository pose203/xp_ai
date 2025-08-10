import { useState } from 'react';
import { Button, Card, Space, Toast, NavBar, Dialog } from 'react-vant';
import { Edit, BrushO, PhotoO, VideoO, Music, Star, Fire, Like } from '@react-vant/icons';
import useTitle from '@/hooks/useTitle';
import styles from './workshop.module.css';
import ImageAnalysis from '../../ImageAnalysis/ImageAnalysis';

const Workshop = () => {
  // 设置页面标题
  useTitle('创作工坊');

  const [showImageAnalysis, setShowImageAnalysis] = useState(false);

  const handleCreateContent = (type) => {
    switch (type) {
      case 'ai-caption':
        setShowImageAnalysis(true);
        break;
      case 'text':
        Toast.info('文字创作开发中...');
        break;
      case 'ai-filter':
        Toast.info('AI 滤镜开发中...');
        break;
    }
  };



  const creationOptions = [
    { 
      key: 'ai-caption', 
      title: 'AI文案', 
      icon: <BrushO />, 
      desc: '🔥 智能分析·一键生成',
      gradient: 'linear-gradient(135deg, #ff8a65, #ff7043)',
      bgColor: '#fef7f5',
      iconColor: '#ff5722',
      special: true
    },
    { 
      key: 'text', 
      title: '写文字', 
      icon: <Edit />, 
      desc: '记录内心真实想法',
      gradient: 'linear-gradient(135deg, #81c784, #66bb6a)',
      bgColor: '#f1f8e9',
      iconColor: '#4caf50'
    },
    { 
      key: 'photo', 
      title: '拍照片', 
      icon: <PhotoO />, 
      desc: '捕捉精彩瞬间',
      gradient: 'linear-gradient(135deg, #64b5f6, #42a5f5)',
      bgColor: '#e3f2fd',
      iconColor: '#2196f3'
    },
    { 
      key: 'ai-filter', 
      title: 'AI 滤镜', 
      icon: <Star />, 
      desc: '创意风格一键应用',
      gradient: 'linear-gradient(135deg, #ba68c8, #ab47bc)',
      bgColor: '#f3e5f5',
      iconColor: '#9c27b0'
    }
  ];

  const recentDrafts = [
    { id: 1, title: 'AI文案草稿', time: '2分钟前', type: 'ai-caption' },
    { id: 2, title: '文字创作', time: '1小时前', type: 'text' },
  ];

  return (
    <div className={styles.container}>
      <NavBar title="创意工坊" className={styles.navbar} />
      
      <div className={styles.content}>
        {/* 创作区域 */}
        <Card className={styles.creationCard}>
          <div className={styles.cardHeader}>
            <h3>开始创作</h3>
            <span className={styles.subtitle}>让灵感变成作品</span>
          </div>
          
          <div className={styles.creationGrid}>
            {creationOptions.map(option => (
              <div key={option.key} className={styles.gridCell}>
                <div 
                  className={`${styles.creationItem} ${option.special ? styles.specialItem : ''}`}
                  data-type={option.key}
                  onClick={() => handleCreateContent(option.key)}
                  style={{ backgroundColor: option.bgColor }}
                >
                  {option.special && <div className={styles.specialBadge}>HOT</div>}
                  <div 
                    className={styles.iconWrapper}
                    style={{ background: option.gradient }}
                  >
                    {option.icon}
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitle}>{option.title}</div>
                    <div className={styles.itemDesc}>{option.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 草稿箱 */}
        <Card className={styles.draftsCard}>
          <div className={styles.cardHeader}>
            <h3>草稿箱</h3>
            <span className={styles.subtitle}>继续未完成的创作</span>
          </div>
          
          <Space direction="vertical" size={12} className={styles.draftsList}>
            {recentDrafts.map(draft => (
              <div key={draft.id} className={styles.draftItem}>
                <div className={styles.draftIcon}>
                  {draft.type === 'ai-caption' && <BrushO />}
                  {draft.type === 'text' && <Edit />}
                </div>
                <div className={styles.draftInfo}>
                  <div className={styles.draftTitle}>{draft.title}</div>
                  <div className={styles.draftTime}>{draft.time}</div>
                </div>
                <Button size="small" type="primary" onClick={() => Toast.info('编辑功能开发中...')}>
                  继续编辑
                </Button>
              </div>
            ))}
          </Space>
        </Card>

        {/* 创作工具 */}
        <Card className={styles.toolsCard}>
          <div className={styles.cardHeader}>
            <h3>创作工具</h3>
            <span className={styles.subtitle}>提升创作效率</span>
          </div>
          
          <div className={styles.toolsList}>
            <div className={styles.toolItem} onClick={() => Toast.info('滤镜功能开发中...')}>
              <div className={styles.toolIcon}>🎨</div>
              <span>滤镜美化</span>
            </div>
            <div className={styles.toolItem} onClick={() => Toast.info('配音功能开发中...')}>
              <div className={styles.toolIcon}>🎵</div>
              <span>配音配乐</span>
            </div>
            <div className={styles.toolItem} onClick={() => Toast.info('特效功能开发中...')}>
              <div className={styles.toolIcon}>✨</div>
              <span>特效处理</span>
            </div>
            <div className={styles.toolItem} onClick={() => Toast.info('贴纸功能开发中...')}>
              <div className={styles.toolIcon}>🏷️</div>
              <span>贴纸文字</span>
            </div>
          </div>
        </Card>


      </div>

      {/* AI图片文案生成对话框 */}
      <Dialog
        visible={showImageAnalysis}
        onClose={() => setShowImageAnalysis(false)}
        closeable
        className={styles.analysisDialog}
      >
        <ImageAnalysis onClose={() => setShowImageAnalysis(false)} />
      </Dialog>
    </div>
  );
};

export default Workshop;