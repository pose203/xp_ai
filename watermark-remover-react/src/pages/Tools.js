import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import {
  ThunderboltOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  SafetyOutlined,
  FileTextOutlined,
  ToolOutlined,
  BankOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const ToolsContainer = styled.div`
  .page-header {
    text-align: center;
    margin-bottom: 32px;
    
    h1 {
      margin: 0 0 8px;
      color: #333;
      font-size: 32px;
      font-weight: 700;
    }
    
    p {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  
  .tool-card {
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      border-color: #ff6b35;
    }
    
    .tool-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: white;
      
      &.batch { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      &.video { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
      &.image { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
      &.watermark { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
      &.md5 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
      &.canvas { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
      &.security { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }
    }
    
    .tool-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
    
    .tool-description {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 20px;
      min-height: 40px;
    }
    
    .tool-features {
      list-style: none;
      padding: 0;
      margin: 16px 0;
      
      li {
        color: #888;
        font-size: 13px;
        margin-bottom: 4px;
        
        &::before {
          content: "✓";
          color: #52c41a;
          margin-right: 8px;
          font-weight: bold;
        }
      }
    }
    
    .tool-button {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      font-size: 16px;
    }
  }
  
  .coming-soon {
    .tool-card {
      opacity: 0.7;
      cursor: not-allowed;
      
      &:hover {
        transform: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-color: transparent;
      }
    }
    
    .tool-button {
      background: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  }
`;

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      key: 'batch',
      title: '批量解析',
      description: '批量获取主页所有视频内容，支持一键下载',
      icon: <ThunderboltOutlined />,
      features: ['支持多平台', '批量处理', '高效快速'],
      available: true,
      path: '/batch'
    },
    {
      key: 'video',
      title: '视频解析',
      description: '单个视频链接解析，去除水印保持原画质',
      icon: <VideoCameraOutlined />,
      features: ['无水印', '原画质', '秒级解析'],
      available: true,
      path: '/'
    },
    {
      key: 'image',
      title: '图片解析',
      description: '图集/单图解析，支持多种图片格式',
      icon: <PictureOutlined />,
      features: ['多格式', '高清画质', '批量下载'],
      available: true,
      path: '/'
    },
    {
      key: 'watermark',
      title: '隐私水印',
      description: '为图片添加自定义隐私水印，保护版权',
      icon: <SafetyOutlined />,
      features: ['自定义水印', '多种样式', '批量添加'],
      available: false,
      path: null
    },
    {
      key: 'md5',
      title: 'MD5工具',
      description: '文件MD5值计算和校验工具',
      icon: <FileTextOutlined />,
      features: ['快速计算', '文件校验', '安全可靠'],
      available: false,
      path: null
    },
    {
      key: 'canvas',
      title: '画布工具',
      description: '在线图片编辑和绘图工具',
      icon: <ToolOutlined />,
      features: ['在线编辑', '多种画笔', '实时预览'],
      available: false,
      path: null
    }
  ];

  const handleToolClick = (tool) => {
    if (!tool.available) {
      return;
    }
    
    if (tool.path) {
      navigate(tool.path);
    }
  };

  return (
    <ToolsContainer>
      <div className="page-header">
        <h1>工具箱</h1>
        <p>丰富的多媒体处理工具，满足您的各种需求</p>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div 
            key={tool.key}
            className={`tool-card-wrapper ${!tool.available ? 'coming-soon' : ''}`}
            onClick={() => handleToolClick(tool)}
          >
            <div className="tool-card">
              <div className={`tool-icon ${tool.key}`}>
                {tool.icon}
              </div>
              <div className="tool-title">{tool.title}</div>
              <div className="tool-description">{tool.description}</div>
              
              <ul className="tool-features">
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <Button 
                className="tool-button"
                type={tool.available ? "primary" : "default"}
                disabled={!tool.available}
                style={tool.available ? {
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  borderColor: 'transparent'
                } : {}}
              >
                {tool.available ? '立即使用' : '敬请期待'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ToolsContainer>
  );
};

export default Tools;
