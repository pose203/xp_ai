import { 
  useState,
  useEffect,
  useCallback,
  useMemo// 缓存一个复杂计算的值

} from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  console.log('App render')
  // 复杂计算 开销高

  const expensiveComputation = useMemo(() => {
    console.log('expensiveComputation')
    for (let i = 0; i < 1000000000; i++) {
      i++
    }
    return num*2
  }, [num])
  
  useEffect(() => {
    console.log('count', count)
  }, [count])
  useEffect(() => {
    console.log('num', num)
  }, [num])
  // rerender 重新生成
  // 不要重新生成，和useEffect [] 一样
  // callback 回调函数 缓存
  const handleClick = useCallback(() => {
    console.log('handleClick')
  }, [num])
 
  return (

    <>
    <div>{expensiveComputation}</div>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>+</button>
    <br/>    
    <button onClick={() => setNum(num + 1)}>+</button>
    <br/>
    <Button onClick={handleClick}>点击</Button>
    </>
  )
}

export default App
