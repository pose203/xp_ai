import React from 'react';
import { Card, Row, Col, Timeline, Typography, Divider, Space, Button } from 'antd';
import { 
  RocketOutlined,
  TeamOutlined,
  SafetyOutlined,
  BulbOutlined,
  HeartOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

const AboutContainer = styled.div`
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
  
  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 48px 32px;
    margin-bottom: 32px;
    color: white;
    text-align: center;
    
    .hero-icon {
      font-size: 72px;
      margin-bottom: 24px;
      opacity: 0.9;
    }
    
    .hero-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    
    .hero-description {
      font-size: 18px;
      opacity: 0.9;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .features-section {
    margin-bottom: 32px;
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
    
    .feature-card {
      text-align: center;
      padding: 32px 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      }
      
      .feature-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 20px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: white;
        
        &.fast { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        &.safe { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
        &.free { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
        &.support { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
      }
      
      .feature-title {
        font-size: 20px;
        font-weight: 600;
        color: #333;
        margin-bottom: 12px;
      }
      
      .feature-description {
        color: #666;
        line-height: 1.6;
      }
    }
  }
  
  .timeline-section {
    margin-bottom: 32px;
    
    .ant-card {
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    }
    
    .ant-timeline-item-head {
      background-color: #ff6b35;
      border-color: #ff6b35;
    }
  }
  
  .stats-section {
    margin-bottom: 32px;
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      
      .stat-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #ff6b35;
          margin-bottom: 8px;
        }
        
        .stat-label {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
  
  .contact-section {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 32px;
    text-align: center;
    
    .contact-title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 16px;
    }
    
    .contact-description {
      color: #666;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    
    .contact-buttons {
      .ant-btn {
        margin: 0 8px;
        border-radius: 8px;
        font-weight: 500;
        
        &.ant-btn-primary {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border-color: transparent;
        }
      }
    }
  }
`;

const About = () => {
  const features = [
    {
      key: 'fast',
      title: '极速解析',
      description: '采用先进的解析技术，秒级完成视频和图片的去水印处理，效率超高。',
      icon: <RocketOutlined />
    },
    {
      key: 'safe',
      title: '安全可靠',
      description: '无需登录，不存储用户数据，所有解析过程在云端安全进行。',
      icon: <SafetyOutlined />
    },
    {
      key: 'free',
      title: '完全免费',
      description: '核心功能完全免费使用，为用户提供优质的去水印服务。',
      icon: <HeartOutlined />
    },
    {
      key: 'support',
      title: '多平台支持',
      description: '支持抖音、快手、小红书等多个主流平台，覆盖面广。',
      icon: <TeamOutlined />
    }
  ];

  const timelineData = [
    {
      children: '项目启动，开始技术调研和架构设计',
      color: '#ff6b35'
    },
    {
      children: '完成核心解析算法开发，支持抖音平台',
      color: '#ff6b35'
    },
    {
      children: '新增快手、小红书平台支持，用户突破1万',
      color: '#ff6b35'
    },
    {
      children: '推出批量解析功能，大幅提升用户体验',
      color: '#ff6b35'
    },
    {
      children: '持续优化算法，提升解析成功率和速度',
      color: '#52c41a'
    }
  ];

  const stats = [
    { number: '100万+', label: '累计解析次数' },
    { number: '50万+', label: '注册用户数' },
    { number: '99.5%', label: '解析成功率' },
    { number: '24/7', label: '服务时间' }
  ];

  return (
    <AboutContainer>
      <div className="page-header">
        <h1>关于我们</h1>
        <p>了解我们的产品理念和发展历程</p>
      </div>

      {/* 产品介绍 */}
      <div className="hero-section">
        <div className="hero-icon">
          <BulbOutlined />
        </div>
        <div className="hero-title">去水印神器</div>
        <div className="hero-description">
          一款专业的多平台视频图片去水印工具，致力于为用户提供简单、快速、高质量的内容处理服务。
          我们相信技术应该让生活更美好，让创作更自由。
        </div>
      </div>

      {/* 产品特色 */}
      <div className="features-section">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          🌟 产品特色
        </Title>
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.key} className="feature-card">
              <div className={`feature-icon ${feature.key}`}>
                {feature.icon}
              </div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-description">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 数据统计 */}
      <div className="stats-section">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          📊 服务数据
        </Title>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 发展历程 */}
      <div className="timeline-section">
        <Card title="🚀 发展历程">
          <Timeline>
            {timelineData.map((item, index) => (
              <Timeline.Item key={index} color={item.color}>
                {item.children}
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </div>

      {/* 技术优势 */}
      <Card title="💡 技术优势" style={{ marginBottom: 32 }}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Title level={5}>先进算法</Title>
            <Paragraph>
              采用深度学习和计算机视觉技术，能够精准识别和去除各种类型的水印，
              同时保持原始内容的完整性和清晰度。
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>云端处理</Title>
            <Paragraph>
              强大的云计算平台支持，确保处理速度和稳定性。
              所有计算在云端完成，用户无需下载任何软件。
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>持续优化</Title>
            <Paragraph>
              技术团队持续研发和优化算法，定期更新以适应各平台的变化，
              确保始终保持最佳的解析效果。
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>用户隐私</Title>
            <Paragraph>
              严格保护用户隐私，不存储任何用户数据和解析内容，
              所有处理过程完全透明和安全。
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 联系我们 */}
      <div className="contact-section">
        <div className="contact-title">联系我们</div>
        <div className="contact-description">
          如果您有任何问题、建议或合作意向，欢迎随时与我们联系。<br/>
          我们将竭诚为您提供优质的服务和支持。
        </div>
        <div className="contact-buttons">
          <Button 
            type="primary" 
            icon={<MailOutlined />}
            onClick={() => window.open('mailto:support@example.com')}
          >
            邮件联系
          </Button>
          <Button 
            icon={<WechatOutlined />}
            onClick={() => alert('微信客服功能开发中...')}
          >
            微信客服
          </Button>
          <Button 
            icon={<GithubOutlined />}
            onClick={() => window.open('https://github.com')}
          >
            GitHub
          </Button>
        </div>
      </div>
    </AboutContainer>
  );
};

export default About;
