import { useState, useEffect, useRef } from 'react';
import { Image as RVImage, Button, Field, Loading, Toast } from 'react-vant';
import { PhotoO } from '@react-vant/icons';
import { getChatMessages, sendMessage } from '../../../../mock/chatData.js';
import { analyzeImageWithSuggestions, analyzeImageWithSuggestionsStreaming } from '@/services/doubaoAPI';
import { useUserStore } from '@/store/useUserStore';
import { useDebounceCallback } from '@/utils/debounce';
import useTitle from '@/hooks/useTitle';

import styles from './chat-interface.module.css';

const ChatInterface = ({ userId, userInfo }) => {
  // 设置页面标题
  useTitle(`与 ${userInfo?.userName || '好友'} 聊天`);

  // 获取当前登录用户信息
  const { userInfo: currentUser } = useUserStore();

  // 渲染期的容错：确保头像等必需字段存在，避免渲染阶段读取 undefined 报错
  const safeUserInfo = userInfo || {
    userName: '用户',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
  };
  const safeCurrentUser = currentUser || {
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
  };
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messageIdCounterRef = useRef(0);
  const fileInputRef = useRef(null);

  // 生成唯一的消息ID (使用不同的前缀避免与用户消息ID冲突)
  const generateBotMessageId = () => {
    messageIdCounterRef.current += 1;
    return `bot_${Date.now()}_${messageIdCounterRef.current}`;
  };

  // 安全添加消息，确保不重复
  const addMessageSafely = (newMessage) => {
    setMessages(prev => {
      // 检查是否已存在相同ID的消息
      const messageExists = prev.some(msg => msg.id === newMessage.id);
      if (messageExists) {
        return prev; // 不添加重复消息
      }
      return [...prev, newMessage];
    });
  };

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 加载聊天消息
  const loadMessages = async () => {
    try {
      const data = await getChatMessages(userId);
      setMessages(data);
    } catch (error) {
      console.error('加载消息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 发送文本消息 - 添加防抖避免重复发送
  const handleSendMessage = useDebounceCallback(async () => {
    if (!inputText.trim() || sending) return;

    const messageText = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      // 发送用户消息
      const userMessage = await sendMessage(userId, messageText);
      addMessageSafely(userMessage);
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setSending(false);
    }
  }, 500, [inputText]); // 500ms防抖，依赖inputText

  // 将图片文件转换为base64格式
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 处理图片上传
  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      // 创建本地预览URL用于显示
      const previewUrl = URL.createObjectURL(file);
      
      // 将图片转换为base64格式用于API调用
      const base64Image = await convertFileToBase64(file);
      
      // 发送用户的图片消息
      const userImageMessage = {
        id: `img_${Date.now()}`,
        type: 'image',
        content: previewUrl,
        timestamp: new Date().toISOString(),
        isSelf: true,
        status: 'sent'
      };
      
      addMessageSafely(userImageMessage);
      
      // 显示AI正在分析的状态
      setAiTyping(true);

      // 调用新的流式API
      const messageId = generateBotMessageId();
      const analysisMessage = {
          id: messageId,
          type: 'ai_analysis',
          content: '', // 初始内容为空
          originalImage: base64Image,
          timestamp: new Date().toISOString(),
          isSelf: false,
          status: 'read'
      };

      addMessageSafely(analysisMessage);

      analyzeImageWithSuggestionsStreaming(
          base64Image, 
          "请分析这张图片，并给出一些修改或创作建议", 
          {
              onStream: (chunk) => {
                  const cleanedChunk = chunk.replace(/###/g, ''); // 移除 "###"
                  setMessages(prev =>
                      prev.map(msg =>
                          msg.id === messageId
                              ? { ...msg, content: msg.content + cleanedChunk }
                              : msg
                      )
                  );
              },
              onClose: () => {
                  setAiTyping(false);
                  setUploading(false);
              },
              onError: (err) => {
                  console.error('图片分析失败:', err);
                  setAiTyping(false);
                  setUploading(false);
                  Toast.fail('AI响应失败');

                  // 在消息气泡中显示固定的、更清晰的错误提示
                  const errorMessage = 'AI响应失败。\n请检查 .env.local 文件中的 VITE_DOUBAO_API_KEY 是否正确配置，然后重启服务。';
                  setMessages(prev =>
                      prev.map(msg =>
                          msg.id === messageId
                              ? { ...msg, content: errorMessage }
                              : msg
                      )
                  );
              }
          }
      );
    } catch (error) {
      console.error('图片上传失败:', error);
      Toast.fail('图片上传失败，请重试');
      setUploading(false); // 确保在初始错误时也重置
    }
  };

  // 触发文件选择
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  // 文件选择处理
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        Toast.fail('请选择图片文件');
        return;
      }
      
      // 检查文件大小 (限制为5MB)
      if (file.size > 5 * 1024 * 1024) {
        Toast.fail('图片大小不能超过5MB');
        return;
      }
      
      handleImageUpload(file);
    }
  };

  // 格式化时间
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // 渲染消息气泡
  const renderMessage = (message) => {
    const isMyMessage = message.isSelf;
    
    return (
      <div 
        key={message.id} 
        className={`${styles.messageItem} ${isMyMessage ? styles.myMessage : styles.theirMessage}`}
      >
        {!isMyMessage && (
          <RVImage
            round
            width="32"
            height="32"
            src={safeUserInfo.avatar}
            className={styles.messageAvatar}
          />
        )}
        
        <div className={styles.messageContent}>
          {message.type === 'text' ? (
            <div className={`${styles.messageBubble} ${isMyMessage ? styles.myBubble : styles.theirBubble}`}>
              <span className={styles.messageText} style={{ whiteSpace: 'pre-line' }}>
                {message.content}
              </span>
            </div>
          ) : message.type === 'ai_analysis' ? (
            <div className={`${styles.messageBubble} ${styles.theirBubble} ${styles.aiAnalysisBubble}`}>
              <div className={styles.aiAnalysisHeader}>
                <span className={styles.aiTag}>🤖 AI图片分析</span>
              </div>
              <div className={styles.aiAnalysisContent} style={{ whiteSpace: 'pre-line' }}>
                {message.content || '内容加载中...'}
              </div>
            </div>
          ) : message.type === 'image' ? (
            <div className={styles.imageMessage}>
              <img
                src={message.content}
                alt="用户发送的图片"
                className={styles.chatImage}
              />
            </div>
          ) : null}
          
          <div className={`${styles.messageTime} ${isMyMessage ? styles.myTime : styles.theirTime}`}>
            {formatMessageTime(message.timestamp)}
            {isMyMessage && (
              <span className={`${styles.messageStatus} ${styles[message.status]}`}>
                {message.status === 'sending' && '发送中'}
                {message.status === 'sent' && '已发送'}
                {message.status === 'read' && '已读'}
              </span>
            )}
          </div>
        </div>
        
        {isMyMessage && (
          <RVImage
            round
            width="32"
            height="32"
            src={safeCurrentUser.avatar}
            className={styles.messageAvatar}
          />
        )}
      </div>
    );
  };



  useEffect(() => {
    loadMessages();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading type="spinner" vertical>加载中...</Loading>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      {/* 消息列表 */}
      <div className={styles.messagesList}>
        {messages.map(renderMessage)}
        
        {/* AI正在打字的状态 */}
        {aiTyping && (
          <div className={`${styles.messageItem} ${styles.theirMessage}`}>
            <RVImage
              round
              width="32"
              height="32"
              src={userInfo.avatar}
              className={styles.messageAvatar}
            />
            <div className={styles.messageContent}>
              <div className={`${styles.messageBubble} ${styles.theirBubble} ${styles.typingBubble}`}>
                <div className={styles.typingIndicator}>
                  <span>小深正在分析图片</span>
                  <div className={styles.typingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <Button
            type="default"
            size="small"
            icon={<PhotoO />}
            className={styles.actionButton}
            onClick={handleImageSelect}
            loading={uploading}
            disabled={uploading}
          />
          
          <Field
            value={inputText}
            onChange={setInputText}
            placeholder="说点什么..."
            className={styles.messageInput}
            onSubmit={handleSendMessage}
          />
          
          <Button
            type="primary"
            size="small"
            loading={sending}
            className={styles.sendButton}
            onClick={handleSendMessage}
            disabled={!inputText.trim() || sending}
          >
            发送
          </Button>
        </div>
      </div>

      {/* 隐藏的文件输入框 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />


    </div>
  );
};

export default ChatInterface;