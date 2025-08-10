import { 
  useState,
  useRef,
  useEffect
} from 'react'
import Progress from './components/progress';
import AudioPlayer from './components/AudioPlayer';
import { SPEAKERS, DEFAULT_SPEAKER } from './constants';

function App() {
  // 界面状态
  // llm ready 大模型准备好了不
  const [ready, setReady] = useState(false)
  const [disabled, setDisabled] = useState(false)
  // 进度条
  const [progressItems, setProgressItems] = useState([])
  // 表单
  const [text, setText] = useState('i love you')
  // 音色
  const [selectedSpeaker, setSelectedSpeaker] = useState('')

  const [output, setOutput] = useState('')


  const worker = useRef(null);
  useEffect(() => {
    // 引入 transformer 
    // http://localhost:5173/worker.js
    worker.current = new Worker(new URL('./worker.js', import.meta.url), {
      type: 'module'
    })
    worker.current.postMessage({
      text: '灵不灵，奔驰s680'
    })

    const onMessageReceived = () => {

    }
    worker.current.onmessage = onMessageReceived;

    return () => worker.current.removeEventListener('message', 
      onMessageReceived
    )
  }, [])
  return (
    <div className="flex">
      <AudioPlayer 
        audioUrl="https://cdn.freesound.org/previews/819/819183_12880153-lq.mp3"
        mimeType="audio/mpeg"
      />
    </div>
  )
}

export default App