import React, { useState } from 'react';
import { Input, Button, Card, Steps, List, Progress, message, Alert } from 'antd';
import { 
  LinkOutlined, 
  PlayCircleOutlined, 
  DownloadOutlined,
  CheckCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { TextArea } = Input;
const { Step } = Steps;

const BatchContainer = styled.div`
  .page-header {
    text-align: center;
    margin-bottom: 32px;
    
    h1 {
      margin: 0 0 8px;
      color: #333;
      font-size: 28px;
      font-weight: 700;
    }
    
    p {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
  }
  
  .steps-container {
    margin-bottom: 32px;
    
    .ant-steps {
      .ant-steps-item-process .ant-steps-item-icon {
        background-color: #ff6b35;
        border-color: #ff6b35;
      }
      
      .ant-steps-item-finish .ant-steps-item-icon {
        background-color: #52c41a;
        border-color: #52c41a;
      }
    }
  }
  
  .input-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }
    
    .input-form {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      
      .ant-input {
        border-radius: 8px;
        border: 2px solid #f0f0f0;
        
        &:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
        }
      }
      
      .ant-btn {
        border-radius: 8px;
        font-weight: 500;
      }
    }
    
    .tips {
      background: #f6ffed;
      border: 1px solid #b7eb8f;
      border-radius: 8px;
      padding: 12px;
      font-size: 13px;
      color: #52c41a;
      
      .tip-item {
        margin-bottom: 4px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  
  .progress-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    
    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .progress-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
      
      .progress-status {
        color: #666;
        font-size: 14px;
      }
    }
  }
  
  .results-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    
    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .results-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
      
      .batch-download {
        .ant-btn {
          border-radius: 8px;
          font-weight: 500;
        }
      }
    }
    
    .result-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .result-info {
        flex: 1;
        margin-right: 16px;
        
        .result-title {
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }
        
        .result-url {
          color: #666;
          font-size: 12px;
          word-break: break-all;
        }
      }
      
      .result-actions {
        display: flex;
        gap: 8px;
        
        .ant-btn {
          border-radius: 6px;
          font-size: 12px;
          padding: 4px 12px;
          height: auto;
        }
      }
      
      .result-status {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        
        &.success {
          background-color: #f6ffed;
          color: #52c41a;
        }
        
        &.loading {
          background-color: #e6f7ff;
          color: #1890ff;
        }
        
        &.error {
          background-color: #fff2f0;
          color: #ff4d4f;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .input-form {
      flex-direction: column;
    }
    
    .progress-header,
    .results-header {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    .result-item {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      
      .result-actions {
        justify-content: flex-end;
      }
    }
  }
`;

const BatchParser = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileUrl, setProfileUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  
  const steps = [
    {
      title: '输入链接',
      description: '输入用户主页链接'
    },
    {
      title: '分析内容',
      description: '获取主页所有视频'
    },
    {
      title: '批量解析',
      description: '去除水印并生成下载链接'
    },
    {
      title: '完成下载',
      description: '批量下载所有内容'
    }
  ];

  const handleAnalyze = async () => {
    if (!profileUrl.trim()) {
      message.warning('请输入用户主页链接');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(1);
    setProgress(0);
    setResults([]);

    try {
      // 模拟分析过程
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // 模拟获取到的视频列表
      const mockResults = [
        { id: 1, title: '精彩视频1', url: 'https://example.com/video1', status: 'pending' },
        { id: 2, title: '精彩视频2', url: 'https://example.com/video2', status: 'pending' },
        { id: 3, title: '精彩视频3', url: 'https://example.com/video3', status: 'pending' },
        { id: 4, title: '精彩视频4', url: 'https://example.com/video4', status: 'pending' },
        { id: 5, title: '精彩视频5', url: 'https://example.com/video5', status: 'pending' }
      ];

      setResults(mockResults);
      setCurrentStep(2);
      
      // 开始批量解析
      await startBatchParsing(mockResults);
      
    } catch (error) {
      message.error('分析失败，请检查链接是否正确');
      setCurrentStep(0);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startBatchParsing = async (videoList) => {
    setCurrentStep(2);
    
    for (let i = 0; i < videoList.length; i++) {
      // 更新当前处理的视频状态
      setResults(prev => prev.map(item => 
        item.id === videoList[i].id 
          ? { ...item, status: 'processing' }
          : item
      ));

      // 模拟解析过程
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟成功/失败
      const success = Math.random() > 0.2; // 80%成功率
      
      setResults(prev => prev.map(item => 
        item.id === videoList[i].id 
          ? { 
              ...item, 
              status: success ? 'success' : 'error',
              downloadUrl: success ? `https://download.example.com/video${item.id}.mp4` : null
            }
          : item
      ));
    }
    
    setCurrentStep(3);
    message.success('批量解析完成！');
  };

  const handleSingleDownload = (item) => {
    if (item.downloadUrl) {
      // 创建下载链接
      const link = document.createElement('a');
      link.href = item.downloadUrl;
      link.download = `${item.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success(`${item.title} 开始下载`);
    }
  };

  const handleBatchDownload = () => {
    const successResults = results.filter(item => item.status === 'success');
    
    if (successResults.length === 0) {
      message.warning('没有可下载的内容');
      return;
    }
    
    successResults.forEach((item, index) => {
      setTimeout(() => {
        handleSingleDownload(item);
      }, index * 500); // 间隔500ms下载，避免浏览器限制
    });
    
    message.success(`开始批量下载 ${successResults.length} 个文件`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <LoadingOutlined className="result-status loading" />;
      case 'success':
        return <CheckCircleOutlined className="result-status success" />;
      case 'error':
        return <span className="result-status error">×</span>;
      default:
        return <span className="result-status">○</span>;
    }
  };

  return (
    <BatchContainer>
      <div className="page-header">
        <h1>批量解析</h1>
        <p>一键获取用户主页所有视频内容</p>
      </div>

      {/* 步骤指示器 */}
      <div className="steps-container">
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </Steps>
      </div>

      {/* 输入区域 */}
      <div className="input-section">
        <div className="section-title">输入用户主页链接</div>
        <div className="input-form">
          <TextArea
            placeholder="请输入抖音/快手/小红书用户主页链接..."
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 4 }}
            style={{ flex: 1 }}
          />
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            loading={isAnalyzing}
            onClick={handleAnalyze}
            style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              borderColor: 'transparent'
            }}
          >
            开始分析
          </Button>
        </div>
        
        <div className="tips">
          <div className="tip-item">• 支持抖音、快手、小红书用户主页链接</div>
          <div className="tip-item">• 系统将自动获取该用户公开发布的所有视频</div>
          <div className="tip-item">• 批量解析可能需要较长时间，请耐心等待</div>
        </div>
      </div>

      {/* 进度显示 */}
      {(currentStep === 1 || isAnalyzing) && (
        <div className="progress-section">
          <div className="progress-header">
            <div className="progress-title">正在分析用户主页</div>
            <div className="progress-status">{progress}%</div>
          </div>
          <Progress 
            percent={progress} 
            strokeColor="#ff6b35"
            showInfo={false}
          />
        </div>
      )}

      {/* 解析结果 */}
      {results.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <div className="results-title">
              解析结果 ({results.filter(r => r.status === 'success').length}/{results.length})
            </div>
            <div className="batch-download">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleBatchDownload}
                disabled={results.filter(r => r.status === 'success').length === 0}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  borderColor: 'transparent'
                }}
              >
                批量下载
              </Button>
            </div>
          </div>
          
          <List
            dataSource={results}
            renderItem={item => (
              <div className="result-item">
                <div className="result-info">
                  <div className="result-title">{item.title}</div>
                  <div className="result-url">{item.url}</div>
                </div>
                
                <div className="result-actions">
                  {item.status === 'success' && (
                    <Button
                      type="primary"
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleSingleDownload(item)}
                    >
                      下载
                    </Button>
                  )}
                </div>
                
                {getStatusIcon(item.status)}
              </div>
            )}
          />
        </div>
      )}
    </BatchContainer>
  );
};

export default BatchParser;
