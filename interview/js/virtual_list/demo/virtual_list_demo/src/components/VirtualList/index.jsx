import { useRef,useState } from 'react';


const VirtualList = ({
    data,
    height,
    itemHeight,
    renderItem,
    overscan
}) => {
    const totalHeight = data.length * itemHeight;
    const containerRef = useRef(null);
    const [offset,setOffset] = useState(0);
    const onScroll = (event) => {
        console.log('onScroll',event);
    }
    return (
        <div
            ref= {containerRef}
            onScroll={onScroll}
            style={{
                height,
                overflow: 'auto',
                position: 'relative',
                //性能优化点，新的图层
                willChange: 'transform'
            }}

        > 
            <div style={{height: totalHeight,position:'relative'}}></div>
            <div style={{
                position:'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${offset}px)`,
            }}></div>
        </div>
    )
}

export default VirtualList