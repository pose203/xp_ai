import {
    useEffect,
    useRef
} from 'react'

const AudioPlayer = ({ audioUrl, mimeType }) => {
    const audioPlayer = useRef(null)
    const audioSource = useRef(null)

    useEffect(() => {
        if (!audioUrl || !audioPlayer.current || !audioSource.current) return

        // 设置音频源并强制重新加载，使新 src 生效
        audioSource.current.src = audioUrl
        audioPlayer.current.load()

        const tryPlay = () => {
            // 某些浏览器需要捕获 Promise 拒绝
            audioPlayer.current?.play().catch(() => {})
        }

        // 已有用户激活则直接播放；否则挂一次性手势监听
        if (document.userActivation?.hasBeenActive) {
            tryPlay()
            return
        }

        const onUserGesture = () => {
            tryPlay()
            window.removeEventListener('pointerdown', onUserGesture, true)
            window.removeEventListener('keydown', onUserGesture, true)
        }

        window.addEventListener('pointerdown', onUserGesture, true)
        window.addEventListener('keydown', onUserGesture, true)

        return () => {
            window.removeEventListener('pointerdown', onUserGesture, true)
            window.removeEventListener('keydown', onUserGesture, true)
        }
    }, [audioUrl])

    return (
        <div className="flex relative z-10 my-4 w-full">
            <audio
                ref={audioPlayer}
                controls
                preload="auto"
                playsInline
                className="w-full h-14 rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
            >
                {/* 浏览器兼容声音的类型不一样 多个source */}
                <source ref={audioSource} type={mimeType} />
            </audio>
        </div>
    )
}

export default AudioPlayer