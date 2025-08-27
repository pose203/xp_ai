import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, Badge } from 'antd';
import {
  HomeOutlined,
  ToolOutlined,
  TrophyOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Header, Footer, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const StyledHeader = styled(Header)`
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  
  .logo {
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .desktop-menu {
    flex: 1;
    margin-left: 32px;
    
    .ant-menu {
      background: transparent;
      border-bottom: none;
      
      .ant-menu-item {
        color: rgba(255, 255, 255, 0.8);
        border-bottom: none;
        
        &:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        
        &.ant-menu-item-selected {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          
          &::after {
            border-bottom: 2px solid white;
          }
        }
      }
    }
  }
  
  .mobile-menu-btn {
    display: none;
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  @media (max-width: 768px) {
    .desktop-menu {
      display: none;
    }
    
    .mobile-menu-btn {
      display: block;
    }
  }
`;

const StyledContent = styled(Content)`
  padding: 24px 16px;
  
  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: white;
  border-top: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    padding: 24px 12px;
  }
`;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-content {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  }
  
  .ant-drawer-header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    
    .ant-drawer-title {
      color: white;
      font-weight: bold;
    }
    
    .ant-drawer-close {
      color: white;
      
      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  
  .ant-drawer-body {
    padding: 0;
    
    .ant-menu {
      background: transparent;
      border-right: none;
      
      .ant-menu-item {
        color: rgba(255, 255, 255, 0.8);
        margin: 8px 16px;
        border-radius: 8px;
        
        &:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        
        &.ant-menu-item-selected {
          color: white;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
`;

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/tools',
    icon: <ToolOutlined />,
    label: '工具',
  },
  {
    key: '/tasks',
    icon: <TrophyOutlined />,
    label: '任务',
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: '我的',
  },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setDrawerVisible(false);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            去水印神器
          </div>
          
          <div className="desktop-menu">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </div>
          
          <Button 
            className="mobile-menu-btn"
            icon={<MenuOutlined />}
            onClick={showDrawer}
          />
        </div>
      </StyledHeader>

      <StyledContent>
        <div className="container">
          <Outlet />
        </div>
      </StyledContent>

      <StyledFooter>
        <div>
          <p style={{ margin: 0, color: '#666' }}>
            © 2024 去水印神器. 支持抖音、快手、小红书等平台
          </p>
          <p style={{ margin: '8px 0 0', color: '#999', fontSize: '12px' }}>
            仅供学习交流使用，请勿用于商业用途
          </p>
        </div>
      </StyledFooter>

      <MobileDrawer
        title="菜单"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={280}
        closeIcon={<CloseOutlined />}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </MobileDrawer>
    </StyledLayout>
  );
};

export default MainLayout;
