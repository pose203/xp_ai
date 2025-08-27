import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Avatar, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Upload, 
  message,
  Statistic,
  Row,
  Col,
  List,
  Badge,
  Divider,
  Space,
  Tooltip
} from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  HistoryOutlined,
  GiftOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CrownOutlined,
  TrophyOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  .profile-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 32px 24px;
    margin-bottom: 24px;
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
      pointer-events: none;
    }
    
    .profile-avatar {
      margin-bottom: 16px;
      
      .ant-avatar {
        border: 4px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }
    }
    
    .profile-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .profile-id {
      opacity: 0.8;
      font-size: 14px;
      margin-bottom: 16px;
    }
    
    .profile-level {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 13px;
      
      .anticon {
        margin-right: 4px;
      }
    }
  }
  
  .stats-section {
    margin-bottom: 24px;
    
    .ant-card {
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      
      .ant-statistic-title {
        color: #666;
        font-size: 14px;
      }
      
      .ant-statistic-content {
        font-weight: bold;
      }
    }
  }
  
  .menu-section {
    .menu-card {
      border-radius: 12px;
      margin-bottom: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      
      .ant-list-item {
        padding: 16px 24px;
        transition: background-color 0.3s ease;
        cursor: pointer;
        
        &:hover {
          background-color: #f5f5f5;
        }
        
        .ant-list-item-meta-title {
          color: #333;
          font-weight: 500;
        }
        
        .ant-list-item-meta-description {
          color: #666;
          font-size: 12px;
        }
        
        .menu-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
          margin-right: 12px;
          
          &.vip { background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #333; }
          &.share { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
          &.history { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
          &.clear { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
          &.help { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          &.service { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
          &.about { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
        }
      }
    }
  }
  
  .modal-content {
    .ant-form-item-label {
      font-weight: 500;
    }
    
    .avatar-upload {
      text-align: center;
      margin-bottom: 16px;
      
      .ant-avatar {
        margin-bottom: 8px;
        border: 2px solid #f0f0f0;
      }
      
      .ant-btn {
        border-radius: 6px;
      }
    }
  }
`;

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: '12345',
    nickname: '点击完善资料',
    avatar: '',
    isVip: false,
    isSuperVip: false,
    vipExpire: null
  });
  
  const [stats, setStats] = useState({
    totalParsed: 1234,
    goldCoins: 156,
    remainingCount: '∞',
    historyPoints: 567
  });
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      // 这里调用API获取用户信息
      // const result = await apiService.getUserInfo();
      // setUserInfo(result);
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
  };

  const handleEditProfile = () => {
    form.setFieldsValue({
      nickname: userInfo.nickname !== '点击完善资料' ? userInfo.nickname : ''
    });
    setEditModalVisible(true);
  };

  const handleSaveProfile = async (values) => {
    setLoading(true);
    try {
      // 这里调用API保存用户信息
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
      
      setUserInfo(prev => ({
        ...prev,
        nickname: values.nickname
      }));
      
      message.success('个人信息更新成功');
      setEditModalVisible(false);
    } catch (error) {
      message.error('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    Modal.confirm({
      title: '清空缓存',
      content: '确定清空缓存吗？您的本地全部数据将被清空！',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 清除本地缓存
          localStorage.clear();
          sessionStorage.clear();
          message.success('缓存清理完成');
        } catch (error) {
          message.error('清空缓存失败');
        }
      }
    });
  };

  const menuItems = [
    {
      key: 'vip',
      title: userInfo.isSuperVip ? '超级会员' : '激活超级会员',
      description: userInfo.isSuperVip ? '已开通超级会员' : '超级会员无广告～',
      icon: <CrownOutlined />,
      action: () => message.info('VIP功能开发中...')
    },
    {
      key: 'share',
      title: '分享程序',
      description: '推荐给朋友使用',
      icon: <ShareAltOutlined />,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: '去水印神器',
            text: '超好用的去水印神器',
            url: window.location.origin
          });
        } else {
          message.info('分享功能开发中...');
        }
      }
    },
    {
      key: 'history',
      title: '解析记录',
      description: '查看历史解析记录',
      icon: <HistoryOutlined />,
      action: () => message.info('解析记录功能开发中...')
    },
    {
      key: 'clear',
      title: '清空缓存',
      description: '清理本地缓存数据',
      icon: <DeleteOutlined />,
      action: handleClearCache
    },
    {
      key: 'help',
      title: '常见问题',
      description: '使用说明和帮助',
      icon: <QuestionCircleOutlined />,
      action: () => message.info('帮助功能开发中...')
    },
    {
      key: 'service',
      title: '联系客服',
      description: '在线客服支持',
      icon: <CustomerServiceOutlined />,
      action: () => message.info('客服功能开发中...')
    },
    {
      key: 'about',
      title: '关于我们',
      description: '了解更多信息',
      icon: <InfoCircleOutlined />,
      action: () => message.info('关于我们功能开发中...')
    }
  ];

  return (
    <ProfileContainer>
      {/* 用户信息头部 */}
      <div className="profile-header">
        <div className="profile-avatar">
          <Avatar 
            size={80} 
            icon={<UserOutlined />} 
            src={userInfo.avatar}
          />
        </div>
        <div className="profile-name">
          {userInfo.nickname}
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={handleEditProfile}
            style={{ color: 'white', marginLeft: 8 }}
          />
        </div>
        <div className="profile-id">UID: {userInfo.id}</div>
        <div className="profile-level">
          <CrownOutlined />
          {userInfo.isSuperVip ? '超级会员' : userInfo.isVip ? '普通会员' : '普通用户'}
        </div>
      </div>

      {/* 统计数据 */}
      <div className="stats-section">
        <Row gutter={16}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="已解析次数"
                value={stats.totalParsed}
                suffix="次"
                valueStyle={{ color: '#ff6b35' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="剩余金币"
                value={stats.goldCoins}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="剩余次数"
                value={stats.remainingCount}
                suffix="次"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="历史积分"
                value={stats.historyPoints}
                suffix="分"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 菜单列表 */}
      <div className="menu-section">
        <Card className="menu-card">
          <List
            dataSource={menuItems}
            renderItem={item => (
              <List.Item onClick={item.action}>
                <List.Item.Meta
                  avatar={<div className={`menu-icon ${item.key}`}>{item.icon}</div>}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* 编辑个人信息弹窗 */}
      <Modal
        title="编辑个人信息"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnHidden
      >
        <div className="modal-content">
          <div className="avatar-upload">
            <Avatar 
              size={80} 
              icon={<UserOutlined />} 
              src={userInfo.avatar}
            />
            <div>
              <Button size="small" style={{ marginTop: 8 }}>
                更换头像
              </Button>
            </div>
          </div>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveProfile}
          >
            <Form.Item
              label="昵称"
              name="nickname"
              rules={[
                { required: true, message: '请输入昵称' },
                { max: 20, message: '昵称不能超过20个字符' }
              ]}
            >
              <Input placeholder="请设置昵称" />
            </Form.Item>
            
            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setEditModalVisible(false)}>
                  取消
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                    borderColor: 'transparent'
                  }}
                >
                  保存修改
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ProfileContainer>
  );
};

export default Profile;
