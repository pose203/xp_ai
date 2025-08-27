import React from 'react';
import { Card, Steps, Collapse, Typography, Divider } from 'antd';
import { 
  PlayCircleOutlined, 
  PictureOutlined, 
  DownloadOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

const InstructionsContainer = styled.div`
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
  
  .content-section {
    margin-bottom: 24px;
    
    .ant-card {
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      
      .ant-card-head {
        border-bottom: 1px solid #f0f0f0;
        
        .ant-card-head-title {
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }
  
  .steps-section {
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
  
  .platform-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin: 16px 0;
    
    .platform-item {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      
      .platform-icon {
        width: 48px;
        height: 48px;
        margin: 0 auto 8px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: white;
        
        &.douyin { background: linear-gradient(135deg, #ff0050 0%, #ff4081 100%); }
        &.kuaishou { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); }
        &.xiaohongshu { background: linear-gradient(135deg, #ff2442 0%, #ff6b9d 100%); }
        &.weibo { background: linear-gradient(135deg, #e6162d 0%, #f93f58 100%); }
      }
      
      .platform-name {
        font-weight: 500;
        color: #333;
      }
    }
  }
  
  .faq-section {
    .ant-collapse {
      border-radius: 8px;
      
      .ant-collapse-item {
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .ant-collapse-header {
          font-weight: 500;
          color: #333;
        }
        
        .ant-collapse-content-box {
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }
  
  .tips-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 24px;
    color: white;
    text-align: center;
    
    .tips-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.9;
    }
    
    .tips-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    
    .tips-content {
      opacity: 0.9;
      line-height: 1.6;
    }
  }
`;

const Instructions = () => {
  const videoSteps = [
    {
      title: '复制链接',
      description: '在目标平台复制视频分享链接',
      icon: <PlayCircleOutlined />
    },
    {
      title: '粘贴解析',
      description: '将链接粘贴到输入框中，点击解析',
      icon: <PictureOutlined />
    },
    {
      title: '获取结果',
      description: '等待解析完成，获取无水印内容',
      icon: <DownloadOutlined />
    }
  ];

  const platforms = [
    { name: '抖音', icon: 'douyin' },
    { name: '快手', icon: 'kuaishou' },
    { name: '小红书', icon: 'xiaohongshu' },
    { name: '微博', icon: 'weibo' }
  ];

  const faqData = [
    {
      key: '1',
      header: '支持哪些平台的内容解析？',
      content: '目前支持抖音、快手、小红书、微博、微视等主流平台的视频和图片解析，后续会持续增加更多平台支持。'
    },
    {
      key: '2',
      header: '解析后的内容画质如何？',
      content: '我们的解析技术能够保持原始画质，解析后的视频和图片与原内容画质完全一致，无任何压缩损失。'
    },
    {
      key: '3',
      header: '每天可以解析多少次？',
      content: '本平台提供完全免费的无限次解析服务，用户每天可以无限次使用去水印功能，无需付费或升级VIP。'
    },
    {
      key: '4',
      header: '批量解析如何使用？',
      content: '在批量解析页面输入用户主页链接，系统会自动获取该用户的所有公开视频，然后进行批量去水印处理。'
    },
    {
      key: '5',
      header: '解析失败怎么办？',
      content: '如果解析失败，请检查：1)链接是否正确完整 2)网络连接是否正常 3)目标内容是否为公开状态 4)稍后重试或联系客服'
    },
    {
      key: '6',
      header: '是否支持私密内容解析？',
      content: '出于隐私保护考虑，我们只支持公开发布的内容解析，不支持私密或仅好友可见的内容。'
    },
    {
      key: '7',
      header: '解析的内容可以商用吗？',
      content: '本工具仅供个人学习交流使用，解析的内容版权仍属于原作者。如需商业使用，请联系原作者获得授权。'
    },
    {
      key: '8',
      header: '如何联系客服？',
      content: '如遇到问题，可以在个人中心页面点击"联系客服"按钮，我们会及时为您解答和处理。'
    }
  ];

  return (
    <InstructionsContainer>
      <div className="page-header">
        <h1>使用教程</h1>
        <p>详细的使用说明，帮您快速上手</p>
      </div>

      {/* 支持平台 */}
      <div className="content-section">
        <Card title="🌟 支持平台">
          <Paragraph>
            目前支持以下主流平台的视频和图片去水印：
          </Paragraph>
          <div className="platform-grid">
            {platforms.map((platform) => (
              <div key={platform.name} className="platform-item">
                <div className={`platform-icon ${platform.icon}`}>
                  <PlayCircleOutlined />
                </div>
                <div className="platform-name">{platform.name}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 使用步骤 */}
      <div className="content-section">
        <Card title="📱 使用步骤" className="steps-section">
          <Steps direction="vertical" size="small">
            {videoSteps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </Steps>
          <Divider />
          <Paragraph type="secondary">
            <Text strong>小贴士：</Text>
            确保复制的是完整的分享链接，包含视频ID等关键信息，这样可以提高解析成功率。
          </Paragraph>
        </Card>
      </div>

      {/* 获取链接方法 */}
      <div className="content-section">
        <Card title="🔗 如何获取分享链接">
          <Title level={5}>抖音</Title>
          <Paragraph>
            1. 打开抖音APP，找到要解析的视频<br/>
            2. 点击右侧分享按钮<br/>
            3. 选择"复制链接"<br/>
            4. 链接已复制到剪贴板
          </Paragraph>

          <Title level={5}>快手</Title>
          <Paragraph>
            1. 打开快手APP，找到要解析的视频<br/>
            2. 点击右侧分享按钮<br/>
            3. 选择"复制链接"<br/>
            4. 链接已复制到剪贴板
          </Paragraph>

          <Title level={5}>小红书</Title>
          <Paragraph>
            1. 打开小红书APP，找到要解析的内容<br/>
            2. 点击右上角分享按钮<br/>
            3. 选择"复制链接"<br/>
            4. 链接已复制到剪贴板
          </Paragraph>
        </Card>
      </div>

      {/* 常见问题 */}
      <div className="content-section">
        <Card title="❓ 常见问题" className="faq-section">
          <Collapse ghost>
            {faqData.map((item) => (
              <Panel
                key={item.key}
                header={item.header}
                extra={<QuestionCircleOutlined />}
              >
                <Paragraph>{item.content}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </Card>
      </div>

      {/* 使用提示 */}
      <div className="content-section">
        <div className="tips-section">
          <div className="tips-icon">
            <BulbOutlined />
          </div>
          <div className="tips-title">友情提示</div>
          <div className="tips-content">
            本工具仅供个人学习交流使用，请勿用于商业用途。<br/>
            解析的内容版权归原作者所有，请尊重原创者的劳动成果。<br/>
            如有疑问或建议，欢迎联系我们的客服团队。
          </div>
        </div>
      </div>
    </InstructionsContainer>
  );
};

export default Instructions;
