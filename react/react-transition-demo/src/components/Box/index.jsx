import { useState } from 'react'
// css in js
import styles from './box.module.css'


const Box = () => {
  const [Open, setOpen] = useState(false)
  return (
    <div>
        <button onClick={() => setOpen(!Open)}>
            {Open ? 'close' : 'open'}
        </button>
        <div className={`${styles.box} ${Open ? styles.open : ''}`}></div>
        
    </div>
  )
}
export default Box