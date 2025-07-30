import styles from  './waterfall.module.css';
import {useRef,useEffect} from 'react';
import ImageCard from '@/components/ImageCard';

const Waterfall = (props) => {
    const loader = useRef(null);
    const {
        loading,
        fetchMore,
        images
    } = props   
    useEffect(()=>{
        // ref 出现视窗了  IntersectionObserver
        // 观察者
        const observer = new IntersectionObserver(([entry])=>{
            console.log(entry);
            if(entry.isIntersecting){
                fetchMore();
            }
        })
        if(loader.current) observer.observe(loader.current);
    },[])

    return (
        <div className={styles.wrapper}>
            <div className={styles.column}>
                {
                images.filter((_,i) => i % 2 === 0).map(img=> (
                    <ImageCard key={img.id} {...img}/>
                ))
                }

            </div>
            <div className={styles.column}>
                {
                images.filter((_,i) => i % 2 === 1).map(img=> (
                    <ImageCard key={img.id} {...img}/>
                ))
                }
            </div>
            <div ref={loader} className={styles.loader}>加载中</div>
        </div>
    )
}

export default Waterfall