import {
  useEffect,
  memo

} from 'react'

const Button = () => {
  useEffect(() => {
    console.log('Button useEffect')
  }, [])
  console.log('Button render')
  return <button>点击</button>
}
// 高阶组件
export default memo(Button)