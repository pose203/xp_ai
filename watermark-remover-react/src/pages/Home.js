import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Input, 
  Button, 
  Card, 
  message, 
  Carousel, 
  notification,
  Row,
  Col,
  Statistic,
  Tag,
  Empty
} from 'antd';
import {
  PlayCircleOutlined,
  PictureOutlined,
  ToolOutlined,
  BookOutlined,
  HistoryOutlined,
  TrophyOutlined,
  CopyOutlined,
  ThunderboltOutlined,
  FireOutlined,
  RocketOutlined,
  DownloadOutlined,
  CloseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { copyToClipboard, parseVideoUrl } from '../utils/helper';
import { apiService } from '../services/api';

const { TextArea } = Input;

const HomeContainer = styled.div`
  .carousel-container {
    margin-bottom: 32px;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-xl);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: 1;
    }
    
    .ant-carousel .slick-slide {
      text-align: center;
      height: 220px;
      line-height: 220px;
      color: white;
      font-size: 24px;
      font-weight: bold;
      position: relative;
    }
    
    .ant-carousel .slick-dots {
      bottom: 16px;
      
      li button {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        width: 8px;
        height: 8px;
      }
      
      li.slick-active button {
        background: white;
        width: 12px;
        height: 12px;
      }
    }
  }

  /* 解析结果区域样式 */
  .result-section {
    margin-bottom: 32px;
    
    .result-card {
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-xl);
      border: 2px solid #52c41a;
      
      .ant-card-head {
        background: linear-gradient(135deg, #52c41a, #73d13d);
        border: none;
        
        .ant-card-head-title {
          color: white;
          font-weight: 600;
        }
        
        .ant-btn {
          color: white;
          border: none;
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
      
      .ant-card-body {
        padding: 24px;
      }
    }
    
    .video-info {
      .thumbnail-container {
        margin-bottom: 16px;
        border-radius: var(--border-radius);
        overflow: hidden;
        
        .video-thumbnail {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
        }
      }
      
      .video-details {
        .video-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .video-author,
        .video-duration,
        .video-size {
          color: var(--text-light);
          margin-bottom: 4px;
          font-size: 0.9rem;
        }
      }
    }
    
    .download-actions {
      .download-item {
        margin-bottom: 16px;
        
        .download-btn {
          height: 48px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: var(--border-radius);
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          box-shadow: var(--shadow);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
        }
      }
      
      .images-download {
        h4 {
          color: var(--text-color);
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          
          .image-item {
            text-align: center;
            
            .preview-image {
              width: 100%;
              height: 80px;
              object-fit: cover;
              border-radius: var(--border-radius);
              margin-bottom: 8px;
              box-shadow: var(--shadow);
            }
            
            .ant-btn {
              width: 100%;
              font-size: 12px;
            }
          }
        }
      }
      
      .no-download {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-light);
      }
    }
  }
  
  .search-section {
    background: white;
    border-radius: var(--border-radius-lg);
    padding: 32px;
    margin-bottom: 32px;
    box-shadow: var(--shadow-lg);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6, #10b981);
      border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    }
    
    .search-header {
      text-align: center;
      margin-bottom: 32px;
      
      h2 {
        margin: 0 0 12px;
        color: var(--text-color);
        font-size: 28px;
        font-weight: 700;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      p {
        margin: 0;
        color: var(--text-light);
        font-size: 16px;
        line-height: 1.6;
      }
    }
    
    .search-form {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      
      .ant-input {
        border-radius: var(--border-radius);
        border: 2px solid var(--border-color);
        font-size: 16px;
        transition: all 0.3s ease;
        
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          transform: translateY(-1px);
        }
        
        &:hover {
          border-color: var(--primary-color);
        }
      }
      
      .action-buttons {
        display: flex;
        gap: 12px;
        
        .ant-btn {
          border-radius: var(--border-radius);
          height: 48px;
          padding: 0 20px;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          &:not(.ant-btn-primary):hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
          }
        }
      }
    }
    
    .tips {
      background: linear-gradient(135deg, #f0fff4 0%, #ecfdf5 100%);
      border: 2px solid #10b981;
      border-radius: var(--border-radius);
      padding: 20px;
      font-size: 14px;
      color: #059669;
      position: relative;
      
      &::before {
        content: '💡';
        position: absolute;
        top: -12px;
        left: 20px;
        background: white;
        padding: 0 8px;
        font-size: 20px;
      }
      
      .tip-item {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        &::before {
          content: '✨';
          margin-right: 8px;
          font-size: 14px;
        }
      }
    }
  }
  
  .stats-section {
    margin-bottom: 32px;
    
    .ant-card {
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      border: none;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
      }
      
      .ant-statistic-title {
        color: var(--text-light);
        font-size: 14px;
        font-weight: 500;
      }
      
      .ant-statistic-content {
        color: var(--primary-color);
        font-weight: bold;
        
        .ant-statistic-content-value {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
    }
  }
  
  .features-section {
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
    
    .feature-card {
      background: white;
      border-radius: var(--border-radius-lg);
      padding: 32px 24px;
      text-align: center;
      box-shadow: var(--shadow-lg);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border: 3px solid transparent;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.6s;
      }
      
      &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: var(--shadow-xl);
        border-color: var(--primary-color);
        
        &::before {
          left: 100%;
        }
        
        .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }
      }
      
      .feature-icon {
        width: 72px;
        height: 72px;
        margin: 0 auto 20px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        color: white;
        transition: all 0.3s ease;
        box-shadow: var(--shadow);
        
        &.batch { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        &.task { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        &.tutorial { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
        &.history { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
      }
      
      .feature-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 12px;
        background: linear-gradient(135deg, var(--text-color) 0%, var(--primary-color) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .feature-description {
        color: var(--text-light);
        font-size: 15px;
        line-height: 1.6;
        font-weight: 400;
      }
    }
  }
  
  @media (max-width: 768px) {
    .search-form {
      flex-direction: column;
      
      .action-buttons {
        justify-content: space-between;
      }
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalParsed: 0,
    todayParsed: 0,
    remainingCount: '∞' // 设置为无限次
  });

  // 轮播图数据
  const carouselData = [
    {
      title: '🚀 支持多平台解析',
      subtitle: '抖音、快手、小红书、微博一键去水印',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🎯'
    },
    {
      title: '💎 高清无损画质',
      subtitle: '保持原始画质，无压缩损失',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🔥'
    },
    {
      title: '⚡ 无限次免费使用',
      subtitle: '每日无限次解析，完全免费',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '✨'
    },
    {
      title: '🔥 批量处理',
      subtitle: '支持批量解析，提高效率',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: '⚡'
    }
  ];

  // 功能卡片数据
  const features = [
    {
      key: 'batch',
      title: '批量解析',
      description: '获取主页所有产品，一键批量处理',
      icon: <ThunderboltOutlined />,
      path: '/batch'
    },
    {
      key: 'task',
      title: '任务中心',
      description: '完成任务获取解析次数',
      icon: <TrophyOutlined />,
      path: '/tasks'
    },
    {
      key: 'tutorial',
      title: '使用教程',
      description: '详细的使用说明和常见问题',
      icon: <BookOutlined />,
      path: '/instructions'
    },
    {
      key: 'history',
      title: '解析记录',
      description: '查看历史解析记录',
      icon: <HistoryOutlined />,
      path: '/profile'
    }
  ];

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // 这里应该调用真实的API
      setStats({
        totalParsed: 1234,
        todayParsed: 56,
        remainingCount: '∞' // 无限次数
      });
    } catch (error) {
      console.error('加载统计数据失败:', error);
    }
  };

  // 粘贴剪贴板内容
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
      message.success('粘贴成功');
    } catch (error) {
      message.error('粘贴失败，请手动输入链接');
    }
  };

  // 解析结果状态
  const [parseResult, setParseResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // 解析视频
  const handleParse = async () => {
    if (!videoUrl.trim()) {
      message.warning('请输入视频链接');
      return;
    }

    setLoading(true);
    setParseResult(null);
    setShowResult(false);
    
    try {
      // 调用真实的解析API
      const result = await parseVideoUrl(videoUrl);
      
      if (result.success) {
        // 设置解析结果
        setParseResult(result);
        setShowResult(true);
        
        notification.success({
          message: '解析成功',
          description: result.isDemo ? 
            '当前为演示模式，显示示例数据。实际使用时会解析真实内容！' : 
            '视频已成功解析，请查看下方结果！',
          duration: result.isDemo ? 5 : 3
        });
        
        // 更新统计数据（无限次数，不减少remainingCount）
        setStats(prev => ({
          ...prev,
          todayParsed: prev.todayParsed + 1,
          totalParsed: prev.totalParsed + 1,
          remainingCount: '∞' // 保持无限次数
        }));
        
        // 清空输入框
        setVideoUrl('');
      } else {
        message.error(result.message || '解析失败，请检查链接是否正确');
      }
    } catch (error) {
      message.error('解析失败，请稍后重试');
      console.error('解析错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 下载文件
  const handleDownload = (url, filename) => {
    if (!url) {
      message.error('下载链接无效');
      return;
    }
    
    // 如果是演示模式，给出提示
    if (parseResult?.isDemo) {
      message.info({
        content: '演示模式：实际使用时会下载真实的无水印内容',
        duration: 3
      });
    }
    
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'download';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // 添加到DOM，触发点击，然后移除
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success('开始下载，请查看浏览器下载管理器');
    } catch (error) {
      console.error('下载失败:', error);
      message.error('下载失败，请稍后重试');
    }
  };

  // 清空输入
  const handleClear = () => {
    setVideoUrl('');
  };

  // 跳转到功能页面
  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <HomeContainer>
      {/* 轮播图 */}
      <div className="carousel-container animate-fade-in-up">
        <Carousel autoplay dotPosition="bottom" effect="fade">
          {carouselData.map((item, index) => (
            <div key={index}>
              <div 
                style={{ 
                  background: item.background,
                  height: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  fontSize: '40px', 
                  opacity: 0.2,
                  animation: 'bounce 2s infinite'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  margin: '0 0 12px', 
                  fontSize: '28px', 
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)' 
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '16px', 
                  opacity: 0.95,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)' 
                }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 搜索解析区域 */}
      <div className="search-section animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="search-header">
          <h2>🎯 视频链接解析</h2>
          <p>支持抖音、快手、小红书、微博等平台视频图片去水印 · 完全免费 · 无限次使用</p>
        </div>
        
        <div className="search-form">
          <TextArea
            placeholder="请粘贴视频/图集链接，支持多种平台..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 4 }}
            style={{ flex: 1 }}
          />
          <div className="action-buttons">
            <Button 
              icon={<CopyOutlined />}
              onClick={handlePaste}
            >
              粘贴
            </Button>
            <Button onClick={handleClear}>
              清空
            </Button>
            <Button 
              type="primary" 
              icon={<PlayCircleOutlined />}
              loading={loading}
              onClick={handleParse}
              className="btn-hover-effect"
              size="large"
              style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderColor: 'transparent',
                fontWeight: 600,
                height: '48px',
                fontSize: '16px'
              }}
            >
              {loading ? '解析中...' : '🚀 一键解析'}
            </Button>
          </div>
        </div>
        
        <div className="tips">
          <div className="tip-item">• 支持抖音、快手、小红书、微博、微视等主流平台</div>
          <div className="tip-item">• 解析后的视频/图片无水印，画质无损</div>
          <div className="tip-item">• 完全免费使用，每日无限次解析</div>
        </div>
      </div>

      {/* 解析结果展示 */}
      {showResult && parseResult && (
        <div className="result-section animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🎉 解析完成</span>
                <Tag color="success">{parseResult.platform}</Tag>
                {parseResult.isDemo && (
                  <Tag color="orange">演示模式</Tag>
                )}
              </div>
            }
            extra={
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setShowResult(false)}
              >
                关闭
              </Button>
            }
            className="result-card"
          >
            <Row gutter={[16, 16]}>
              {/* 视频信息 */}
              <Col xs={24} md={12}>
                <div className="video-info">
                  {parseResult.thumbnailUrl && (
                    <div className="thumbnail-container">
                      <img
                        src={parseResult.thumbnailUrl}
                        alt="视频封面"
                        className="video-thumbnail"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="video-details">
                    <h3 className="video-title">{parseResult.title}</h3>
                    <p className="video-author">👤 {parseResult.author}</p>
                    {parseResult.duration && (
                      <p className="video-duration">⏱️ 时长: {parseResult.duration}</p>
                    )}
                    {parseResult.fileSize && (
                      <p className="video-size">📦 大小: {parseResult.fileSize}</p>
                    )}
                  </div>
                </div>
              </Col>
              
              {/* 下载操作 */}
              <Col xs={24} md={12}>
                <div className="download-actions">
                  {/* 视频下载 */}
                  {parseResult.downloadUrl && (
                    <div className="download-item">
                      <Button
                        type="primary"
                        size="large"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(
                          parseResult.downloadUrl,
                          `${parseResult.title || '视频'}.mp4`
                        )}
                        block
                        className="download-btn"
                      >
                        下载无水印视频
                      </Button>
                    </div>
                  )}
                  
                  {/* 图片下载 */}
                  {parseResult.images && parseResult.images.length > 0 && (
                    <div className="images-download">
                      <h4>📸 图片素材 ({parseResult.images.length}张)</h4>
                      <div className="images-grid">
                        {parseResult.images.map((img, index) => (
                          <div key={index} className="image-item">
                            <img
                              src={img.url || img}
                              alt={`图片${index + 1}`}
                              className="preview-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <Button
                              size="small"
                              icon={<DownloadOutlined />}
                              onClick={() => handleDownload(
                                img.url || img,
                                `图片${index + 1}.jpg`
                              )}
                            >
                              下载
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 如果没有下载链接，显示提示 */}
                  {!parseResult.downloadUrl && (!parseResult.images || parseResult.images.length === 0) && (
                    <div className="no-download">
                      <Empty
                        description="暂无可下载的内容"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      )}

      {/* 统计数据 */}
      <div className="stats-section animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <Row gutter={[24, 16]}>
          <Col xs={8} sm={8} md={8}>
            <Card className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <Statistic
                title="累计解析"
                value={stats.totalParsed}
                suffix="次"
                prefix={<FireOutlined style={{color: '#f59e0b'}} />}
                valueStyle={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold'
                }}
              />
            </Card>
          </Col>
          <Col xs={8} sm={8} md={8}>
            <Card className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Statistic
                title="今日解析"
                value={stats.todayParsed}
                suffix="次"
                prefix={<RocketOutlined style={{color: '#6366f1'}} />}
                valueStyle={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold'
                }}
              />
            </Card>
          </Col>
          <Col xs={8} sm={8} md={8}>
            <Card className="animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <Statistic
                title="剩余次数"
                value={stats.remainingCount}
                prefix={<ThunderboltOutlined style={{color: '#10b981'}} />}
                valueStyle={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '32px',
                  fontWeight: 'bold'
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 功能区域 */}
      <div className="features-section animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.key}
              className="feature-card card-hover animate-fade-in-up"
              onClick={() => handleFeatureClick(feature.path)}
              style={{animationDelay: `${0.8 + index * 0.1}s`}}
            >
              <div className={`feature-icon ${feature.key}`}>
                {feature.icon}
              </div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-description">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </HomeContainer>
  );
};

export default Home;
