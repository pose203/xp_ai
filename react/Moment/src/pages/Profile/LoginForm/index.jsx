import { useState } from 'react';
import { UserCircleO } from '@react-vant/icons';
import { useUserStore } from '../../../store/useUserStore';
import styles from './loginForm.module.css';

const LoginForm = ({ onLoginSuccess }) => {
  // 登录/注册界面切换
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // 表单数据状态
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  
  // 从用户store获取方法和状态
  const { login, register, loading, error } = useUserStore();
  

  


  // 获取已注册用户列表
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [
      // 默认演示账号
      { email: 'demo@qiezi.com', password: '123456', username: '演示用户' }
    ];
  };

  // 保存用户到本地存储
  const saveUser = (userData) => {
    const users = getRegisteredUsers();
    users.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  // 显示消息函数
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // 更新表单数据
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 表单验证
  const validateForm = () => {
    if (isLoginMode) {
      // 登录验证
      if (!formData.email.trim()) {
        showMessage('error', '请输入手机号或邮箱');
        return false;
      }
      if (!formData.password.trim()) {
        showMessage('error', '请输入密码');
        return false;
      }
    } else {
      // 注册验证
      if (!formData.username.trim()) {
        showMessage('error', '请输入用户名');
        return false;
      }
      if (!formData.email.trim()) {
        showMessage('error', '请输入手机号');
        return false;
      }
      if (!formData.password.trim()) {
        showMessage('error', '请输入密码');
        return false;
      }
      if (formData.password.length < 6) {
        showMessage('error', '密码长度至少6位');
        return false;
      }
      if (!formData.confirmPassword.trim()) {
        showMessage('error', '请确认密码');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        showMessage('error', '两次输入的密码不一致');
        return false;
      }
    }
    return true;
  };

  // 处理登录
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      const credentials = {
        username: formData.email || formData.username, // 支持邮箱或用户名登录
        password: formData.password
      };
      
      const result = await login(credentials);
      
      if (result.success) {
        showMessage('success', result.message || '登录成功！');
        setTimeout(() => {
          onLoginSuccess && onLoginSuccess();
        }, 1000);
      } else {
        showMessage('error', result.message || '登录失败');
      }
    } catch (err) {
      showMessage('error', err.message || '登录失败，请重试');
    }
  };

  // 处理注册
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        nickname: formData.username
      };
      
      const result = await register(userData);
      
      if (result.success) {
        showMessage('success', result.message || '注册成功，欢迎加入遇见！');
        setTimeout(() => {
          onLoginSuccess && onLoginSuccess();
        }, 1000);
      } else {
        showMessage('error', result.message || '注册失败');
      }
    } catch {
      showMessage('error', '注册失败，请重试');
    } finally {

    }
  };

  // 切换登录/注册模式
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // 清空表单数据
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    });
    // 清空消息
    setMessage({ type: '', text: '' });
  };

  return (
    <div className={styles.container}>
      {/* 消息提示区域 */}
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {/* 登录/注册界面 */}
      <div className={styles.loginSection}>
        <div className={styles.loginContent}>
          <div className={styles.loginAvatar}>
            <UserCircleO className={styles.loginIcon} />
          </div>
          
          {/* 登录/注册标题 */}
          <div className={styles.loginTitle}>
            {isLoginMode ? '登录遇见' : '注册遇见'}
          </div>
          <div className={styles.loginSubtitle}>
            {isLoginMode 
              ? '登录后可浏览精彩图片和结识新朋友' 
              : '注册后即可开启图片社交之旅'
            }
          </div>
          
          {/* 表单区域 */}
          <div className={styles.formContainer}>
            {!isLoginMode && (
              <>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    placeholder="请输入用户名"
                    className={styles.formInput}
                    value={formData.username}
                    onChange={(e) => updateFormData('username', e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    placeholder="请输入昵称（可选）"
                    className={styles.formInput}
                    value={formData.nickname}
                    onChange={(e) => updateFormData('nickname', e.target.value)}
                  />
                </div>
              </>
            )}
            
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder={isLoginMode ? "手机号/邮箱" : "请输入手机号"}
                className={styles.formInput}
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="password" 
                placeholder="请输入密码"
                className={styles.formInput}
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
              />
            </div>
            
            {!isLoginMode && (
              <div className={styles.inputGroup}>
                <input 
                  type="password" 
                  placeholder="请确认密码"
                  className={styles.formInput}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                />
              </div>
            )}
          </div>
          
          {/* 主要操作按钮 */}
          <button 
            className={styles.loginButton} 
            onClick={isLoginMode ? handleLogin : handleRegister}
            disabled={loading}
          >
            {loading ? '处理中...' : (isLoginMode ? '立即登录' : '立即注册')}
          </button>
          
          {/* 模式切换 */}
          <div className={styles.switchMode}>
            <span className={styles.switchText}>
              {isLoginMode ? '还没有账号？' : '已有账号？'}
            </span>
            <button className={styles.switchButton} onClick={toggleMode}>
              {isLoginMode ? '立即注册' : '立即登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;