import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Progress, 
  List, 
  Badge, 
  message,
  Modal,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  GiftOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const TasksContainer = styled.div`
  .page-header {
    text-align: center;
    margin-bottom: 24px;
    
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
  
  .daily-stats {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    color: white;
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      text-align: center;
      
      .stat-item {
        h3 {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: bold;
        }
        
        p {
          margin: 0;
          opacity: 0.8;
          font-size: 14px;
        }
      }
    }
  }
  
  .task-sections {
    display: grid;
    gap: 24px;
    
    .task-section {
      .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        
        .section-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          color: white;
          
          &.daily { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
          &.share { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
          &.invite { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
      }
      
      .ant-card {
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      }
      
      .task-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .task-info {
          flex: 1;
          
          .task-title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
            margin-bottom: 4px;
          }
          
          .task-description {
            color: #666;
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .task-progress {
            margin-bottom: 0;
          }
        }
        
        .task-reward {
          text-align: center;
          margin: 0 16px;
          
          .reward-amount {
            font-size: 18px;
            font-weight: bold;
            color: #ff6b35;
            margin-bottom: 4px;
          }
          
          .reward-unit {
            color: #666;
            font-size: 12px;
          }
        }
        
        .task-action {
          .ant-btn {
            border-radius: 6px;
            font-weight: 500;
            min-width: 80px;
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .task-item {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      
      .task-reward {
        margin: 0;
        text-align: left;
        
        .reward-amount {
          display: inline;
          margin-right: 8px;
        }
      }
      
      .task-action {
        width: 100%;
        
        .ant-btn {
          width: 100%;
        }
      }
    }
  }
`;

const Tasks = () => {
  const [tasks, setTasks] = useState({
    daily: [],
    share: [],
    invite: []
  });
  
  const [userStats, setUserStats] = useState({
    dailyCompleted: 0,
    totalRewards: 0,
    inviteCount: 0
  });

  useEffect(() => {
    loadTasks();
    loadUserStats();
  }, []);

  const loadTasks = async () => {
    try {
      // 模拟API数据
      setTasks({
        daily: [
          {
            id: 1,
            title: '每日签到',
            description: '每天签到即可获得奖励',
            progress: 0,
            total: 1,
            reward: 10,
            completed: false,
            type: 'checkin'
          },
          {
            id: 2,
            title: '解析视频',
            description: '解析任意视频获得奖励',
            progress: 2,
            total: 5,
            reward: 20,
            completed: false,
            type: 'parse'
          },
          {
            id: 3,
            title: '观看广告',
            description: '观看激励视频广告',
            progress: 1,
            total: 3,
            reward: 15,
            completed: false,
            type: 'ad'
          }
        ],
        share: [
          {
            id: 4,
            title: '分享给好友',
            description: '分享应用给好友使用',
            progress: 0,
            total: 1,
            reward: 30,
            completed: false,
            type: 'share'
          }
        ],
        invite: [
          {
            id: 5,
            title: '邀请新用户',
            description: '成功邀请新用户注册',
            progress: 0,
            total: 1,
            reward: 100,
            completed: false,
            type: 'invite'
          }
        ]
      });
    } catch (error) {
      console.error('加载任务失败:', error);
    }
  };

  const loadUserStats = async () => {
    try {
      setUserStats({
        dailyCompleted: 2,
        totalRewards: 156,
        inviteCount: 3
      });
    } catch (error) {
      console.error('加载用户统计失败:', error);
    }
  };

  const handleTaskAction = async (task) => {
    try {
      switch (task.type) {
        case 'checkin':
          await handleCheckin(task);
          break;
        case 'parse':
          message.info('请前往首页解析视频');
          break;
        case 'ad':
          await handleWatchAd(task);
          break;
        case 'share':
          await handleShare(task);
          break;
        case 'invite':
          await handleInvite(task);
          break;
        default:
          message.info('功能开发中...');
      }
    } catch (error) {
      message.error('操作失败，请稍后重试');
    }
  };

  const handleCheckin = async (task) => {
    // 模拟签到API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    message.success('签到成功，获得10个金币！');
    
    // 更新任务状态
    setTasks(prev => ({
      ...prev,
      daily: prev.daily.map(t => 
        t.id === task.id 
          ? { ...t, progress: t.total, completed: true }
          : t
      )
    }));
    
    // 更新用户统计
    setUserStats(prev => ({
      ...prev,
      dailyCompleted: prev.dailyCompleted + 1,
      totalRewards: prev.totalRewards + task.reward
    }));
  };

  const handleWatchAd = async (task) => {
    Modal.confirm({
      title: '观看激励视频',
      content: '观看完整广告视频即可获得奖励',
      okText: '开始观看',
      cancelText: '取消',
      onOk: async () => {
        // 模拟观看广告
        message.loading('正在加载广告...', 2);
        
        setTimeout(() => {
          message.success('观看完成，获得15个金币！');
          
          setTasks(prev => ({
            ...prev,
            daily: prev.daily.map(t => 
              t.id === task.id 
                ? { ...t, progress: Math.min(t.progress + 1, t.total) }
                : t
            )
          }));
          
          setUserStats(prev => ({
            ...prev,
            totalRewards: prev.totalRewards + task.reward
          }));
        }, 2000);
      }
    });
  };

  const handleShare = async (task) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '去水印神器',
          text: '超好用的去水印神器，支持多平台视频图片去水印！',
          url: window.location.origin
        });
        
        message.success('分享成功，获得30个金币！');
        
        setTasks(prev => ({
          ...prev,
          share: prev.share.map(t => 
            t.id === task.id 
              ? { ...t, progress: t.total, completed: true }
              : t
          )
        }));
        
        setUserStats(prev => ({
          ...prev,
          totalRewards: prev.totalRewards + task.reward
        }));
      } catch (error) {
        message.info('分享已取消');
      }
    } else {
      // 复制链接到剪贴板
      try {
        await navigator.clipboard.writeText(window.location.origin);
        message.success('链接已复制到剪贴板，请分享给好友！');
      } catch (error) {
        message.info('请手动复制链接分享给好友');
      }
    }
  };

  const handleInvite = async (task) => {
    message.info('邀请功能开发中...');
  };

  const getTaskButtonText = (task) => {
    if (task.completed) {
      return '已完成';
    }
    
    if (task.progress >= task.total) {
      return '领取奖励';
    }
    
    switch (task.type) {
      case 'checkin':
        return '签到';
      case 'parse':
        return '去解析';
      case 'ad':
        return '观看广告';
      case 'share':
        return '去分享';
      case 'invite':
        return '去邀请';
      default:
        return '开始任务';
    }
  };

  const getTaskButtonType = (task) => {
    if (task.completed) {
      return 'default';
    }
    
    if (task.progress >= task.total) {
      return 'primary';
    }
    
    return 'primary';
  };

  const renderTaskSection = (title, tasks, iconClass) => (
    <div className="task-section">
      <div className="section-header">
        <div className={`section-icon ${iconClass}`}>
          {iconClass === 'daily' && <CalendarOutlined />}
          {iconClass === 'share' && <ShareAltOutlined />}
          {iconClass === 'invite' && <TrophyOutlined />}
        </div>
        <h3 className="section-title">{title}</h3>
      </div>
      
      <Card>
        <List
          dataSource={tasks}
          renderItem={task => (
            <div className="task-item">
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
                <Progress 
                  className="task-progress"
                  percent={(task.progress / task.total) * 100}
                  format={() => `${task.progress}/${task.total}`}
                  strokeColor="#ff6b35"
                />
              </div>
              
              <div className="task-reward">
                <div className="reward-amount">+{task.reward}</div>
                <div className="reward-unit">金币</div>
              </div>
              
              <div className="task-action">
                <Button
                  type={getTaskButtonType(task)}
                  disabled={task.completed}
                  onClick={() => handleTaskAction(task)}
                  icon={task.completed ? <CheckCircleOutlined /> : undefined}
                  style={
                    getTaskButtonType(task) === 'primary' ? {
                      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                      borderColor: 'transparent'
                    } : {}
                  }
                >
                  {getTaskButtonText(task)}
                </Button>
              </div>
            </div>
          )}
        />
      </Card>
    </div>
  );

  return (
    <TasksContainer>
      <div className="page-header">
        <h1>任务中心</h1>
        <p>完成任务获取金币，解锁更多功能</p>
      </div>

      {/* 每日统计 */}
      <div className="daily-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>{userStats.dailyCompleted}</h3>
            <p>今日完成</p>
          </div>
          <div className="stat-item">
            <h3>{userStats.totalRewards}</h3>
            <p>累计金币</p>
          </div>
          <div className="stat-item">
            <h3>{userStats.inviteCount}</h3>
            <p>邀请人数</p>
          </div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="task-sections">
        {renderTaskSection('每日任务', tasks.daily, 'daily')}
        {renderTaskSection('分享任务', tasks.share, 'share')}
        {renderTaskSection('邀请任务', tasks.invite, 'invite')}
      </div>
    </TasksContainer>
  );
};

export default Tasks;
