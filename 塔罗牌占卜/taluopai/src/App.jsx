import { useState } from 'react'
import './App.css'

function App() {
  const [selectedSpread, setSelectedSpread] = useState('single')
  const [question, setQuestion] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawnCards, setDrawnCards] = useState([])
  const [showInterpretation, setShowInterpretation] = useState(false)
  const [overallInterpretation, setOverallInterpretation] = useState('')

  const clearCards = () => {
    setDrawnCards([])
    setShowInterpretation(false)
  }

  const handleSpreadSelect = (spread) => {
    setSelectedSpread(spread)
    clearCards()
  }

  const getCardCount = () => {
    switch(selectedSpread) {
      case 'single': return 1
      case 'three': return 3
      case 'celtic': return 10
      default: return 1
    }
  }

  const getSpreadMeaning = (spread) => {
    switch(spread) {
      case 'single':
        return '单张牌为您提供了最直接的答案和建议。'
      case 'three':
        return '三张牌分别代表过去、现在和未来的能量流向。'
      case 'celtic':
        return '凯尔特十字牌阵为您展现了问题的全貌和深层次的洞察。'
      default:
        return ''
    }
  }

  const getMockResponse = (question, spread) => {
    // 模拟后端返回的数据
    const cards = [
      { name: '愚者', meaning: '新的开始，冒险精神', interpretation: '这张牌暗示着您正站在一个新的起点上，需要勇敢地踏出第一步。' },
      { name: '魔术师', meaning: '创造力，意志力', interpretation: '您拥有实现目标所需的所有工具和能力，关键在于如何运用。' },
      { name: '女祭司', meaning: '直觉，内在智慧', interpretation: '相信您的直觉，答案就在您的内心深处。' },
      { name: '皇后', meaning: '丰饶，母性', interpretation: '创造力与关怀正在您的生活中显现。' },
      { name: '皇帝', meaning: '权威，控制', interpretation: '建立稳固的结构和基础将为您带来成功。' },
      { name: '教皇', meaning: '传统，精神指导', interpretation: '向智者学习，从传统中汲取智慧。' },
      { name: '恋人', meaning: '爱情，选择', interpretation: '您面临一个重要的选择，遵循内心的指引。' },
      { name: '战车', meaning: '意志力，胜利', interpretation: '通过决心和坚持不懈，您将克服障碍。' },
      { name: '力量', meaning: '内在力量，勇气', interpretation: '温柔而坚定的力量将帮助您驾驭困境。' },
      { name: '隐士', meaning: '内省，智慧', interpretation: '现在是反思和寻求内在指引的时候了。' }
    ]

    const cardCount = getCardCount()
    const selectedCards = cards.slice(0, cardCount)

    return {
      cards: selectedCards,
      overallInterpretation: `针对您的问题"${question}"，塔罗牌为您揭示了重要的指引。${getSpreadMeaning(spread)}`
    }
  }

  const drawCards = async () => {
    if (!question.trim()) {
      alert('请先输入您的问题')
      return
    }

    setIsDrawing(true)
    clearCards()

    // 显示卡牌背面
    const cardCount = getCardCount()
    const cardBacks = Array(cardCount).fill({ isBack: true })
    setDrawnCards(cardBacks)

    try {
      // 模拟API调用
      setTimeout(() => {
        const response = getMockResponse(question, selectedSpread)
        
        // 显示结果
        setDrawnCards(response.cards)
        setOverallInterpretation(response.overallInterpretation)
        setShowInterpretation(true)
        setIsDrawing(false)
      }, 2000)
    } catch (error) {
      console.error('占卜失败:', error)
      alert('占卜失败，请稍后重试')
      setIsDrawing(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🔮 塔罗牌AI助手</h1>
        <p>探索内心的智慧，寻找人生的答案</p>
      </div>

      <div className="spread-selection">
        <label>选择牌阵：</label>
        <div className="spread-buttons">
          <button 
            className={`spread-btn ${selectedSpread === 'single' ? 'active' : ''}`} 
            onClick={() => handleSpreadSelect('single')}
          >
            单张牌
          </button>
          <button 
            className={`spread-btn ${selectedSpread === 'three' ? 'active' : ''}`}
            onClick={() => handleSpreadSelect('three')}
          >
            三张牌
          </button>
          <button 
            className={`spread-btn ${selectedSpread === 'celtic' ? 'active' : ''}`}
            onClick={() => handleSpreadSelect('celtic')}
          >
            凯尔特十字
          </button>
        </div>
      </div>

      <div className="question-input">
        <label>请输入您想要咨询的问题：</label>
        <textarea 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="请详细描述您想要了解的问题或困惑..."
        />
      </div>

      <button 
        className="draw-button" 
        onClick={drawCards}
        disabled={isDrawing}
      >
        {isDrawing ? '正在占卜...' : '开始占卜'}
      </button>

      <div className="cards-container">
        {drawnCards.map((card, index) => (
          <div 
            key={index} 
            className={`card ${!card.isBack ? 'revealed' : ''}`}
          >
            <div className="card-name">
              {card.isBack ? '🌟' : card.name}
            </div>
          </div>
        ))}
      </div>

      {showInterpretation && (
        <div className="interpretation">
          <h3>🌟 牌面解读</h3>
          <div>
            {drawnCards.map((card, index) => (
              <div key={index} className="card-details">
                <h4>{card.name} - {card.meaning}</h4>
                <p>{card.interpretation}</p>
              </div>
            ))}
            <p><strong>整体解读：</strong>{overallInterpretation}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
