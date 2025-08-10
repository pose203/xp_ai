import {
  useEffect,
  useState
} from 'react';
import {
  Button,
  Input,
  Loading,
  Toast
} from 'react-vant'

import useTitle from '@/hooks/useTitle'
import {
  chat
} from '@/llm'
import styles from './trip.module.css';
import {
  ChatO,
  UserO
} from '@react-vant/icons';

const Trip = () => {
  useTitle('旅游智能客服')
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  // 数据驱动界面
  // 静态界面 - 修复消息顺序，AI应该先打招呼
  const [messages, setMessages] = useState([
      {
          id: 1,
          content: '您好！我是您的旅游智能客服，有什么可以帮助您的吗？✈️',
          role: 'assistant'
      }
  ]);

  const handleChat = async () => {
      if (text.trim() === "") {
          Toast.info({
              message: '内容不能为空'
          })
          return 
      }
      setIsSending(true)
      const userMessage = text;
      setText('')
      
      // 添加用户消息
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: Date.now(), // 添加唯一ID
            role: 'user',
            content: userMessage
          }
        ]
      })
      
      try {
        // 获取AI回复
        const newMessage = await chat([{
          role: 'user',
          content: userMessage
        }]);
        
        // 添加AI回复消息
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: Date.now() + 1, // 添加唯一ID
              role: 'assistant',
              content: newMessage.data.content || newMessage.data
            }
          ]
        })
      } catch (error) {
        console.error('聊天失败:', error);
        // 添加错误提示消息
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: Date.now() + 1,
              role: 'assistant',
              content: '抱歉，我现在无法回复，请稍后再试。'
            }
          ]
        })
      }
      
      setIsSending(false)
  }
  return (
      <div className="flex flex-col h-all">
          <div className={`flex-1 ${styles.chatArea}`}>
          {
              messages.map((msg, index) => (
                  <div 
                      key={index}
                      className={
                          msg.role === 'user'? 
                          styles.messageRight :
                          styles.messageLeft
                      }
                  >
                      {
                          msg.role === 'assistant'?
                          <ChatO />:
                          <UserO/>
                      }
                      {msg.content}
                  </div>
              ))
          }
          </div>
          <div className={`flex ${styles.inputArea}`}>
              <Input
                  value={text}
                  onChange={(e) => setText(e)}
                  placeholder="请输入消息"
                  className={`flex-1 ${styles.input}`}
              />
              <Button disabled={isSending} type="primary" onClick={handleChat} >发送</Button>
          </div>
          {isSending &&  (<div className="fixed-loading"><Loading type="ball"/></div>) }
      </div>
  )
}

export default Trip