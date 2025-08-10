import useTitle from "@/hooks/useTitle"
import {Button} from 'react-vant';
import {showToast} from '@/components/Toast/ToastController';


const Home = () => {
  useTitle("奶龙首页")
  return (
    <>
      Home
      <Button type="primary" onClick={()=>showToast(1,2,3)}>showToast</Button>
    </>
  )
}

export default Home