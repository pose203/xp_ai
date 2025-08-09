// AI好友聊天数据模拟
export const mockChatList = [
  {
    id: 1,
    userId: 'ai_doubao',
    userName: '小深',
    avatar: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
    lastMessage: '你好！我是你的AI聊天伙伴小深，有什么想聊的吗？',
    lastMessageTime: new Date().toLocaleString(),
    unreadCount: 0,
    isOnline: true,
    lastActiveTime: '在线',
    bio: '我是你的专属AI聊天伙伴，随时在线陪你聊天！',
    age: '∞',
    location: '云端'
  }
];

// AI聊天消息数据
export const mockChatMessages = {
  ai_doubao: [
    {
      id: 'm_001',
      type: 'text',
      content: '你好！我是小深，你的AI聊天伙伴～很高兴认识你！',
      timestamp: '2024-01-20 14:25',
      isSelf: false,
      status: 'read'
    },
    {
      id: 'm_002',
      type: 'text',
      content: '你好小深！',
      timestamp: '2024-01-20 14:26',
      isSelf: true,
      status: 'read'
    },
    {
      id: 'm_003',
      type: 'text',
      content: '有什么想聊的吗？我可以陪你聊天、回答问题，或者听你分享心情～',
      timestamp: '2024-01-20 14:27',
      isSelf: false,
      status: 'read'
    },
    {
      id: 'm_004',
      type: 'text',
      content: '今天心情怎么样？',
      timestamp: '2024-01-20 14:28',
      isSelf: true,
      status: 'read'
    },
    {
      id: 'm_005',
      type: 'text',
      content: '今天心情还不错！有你这样的AI朋友陪聊真是太好了～你知道些什么有趣的事情吗？',
      timestamp: '2024-01-20 14:30',
      isSelf: false,
      status: 'read'
    },
    {
      id: 'm_006',
      type: 'text',
      content: '哈哈，我知道很多有趣的事情呢！比如你知道吗？章鱼有三颗心脏，而且它们的血液是蓝色的！🐙',
      timestamp: '2024-01-20 14:32',
      isSelf: false,
      status: 'read'
    }
  ]
};

// 获取聊天列表
export const getChatList = () => {
  return Promise.resolve(mockChatList);
};

// 获取聊天消息
export const getChatMessages = (userId) => {
  return Promise.resolve(mockChatMessages[userId] || []);
};

// 消息ID计数器，确保唯一性
let messageIdCounter = 0;

// 发送消息
export const sendMessage = (userId, message) => {
  messageIdCounter++;
  const newMessage = {
    id: `m_${Date.now()}_${messageIdCounter}`,
    type: 'text',
    content: message,
    timestamp: new Date().toISOString(),
    isSelf: true,
    status: 'sent'
  };
  
  if (!mockChatMessages[userId]) {
    mockChatMessages[userId] = [];
  }
  
  mockChatMessages[userId].push(newMessage);
  
  // 更新聊天列表中的最后一条消息
  const chatIndex = mockChatList.findIndex(chat => chat.userId === userId);
  if (chatIndex !== -1) {
    mockChatList[chatIndex].lastMessage = message;
    mockChatList[chatIndex].lastMessageTime = new Date().toLocaleString();
  }
  
  return Promise.resolve(newMessage);
};