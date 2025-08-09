import { useEffect } from 'react'

/**
 * 自定义Hook：动态设置页面标题
 * @param {string} title - 要设置的页面标题
 */
function useTitle(title) {
    useEffect(() => {
        if (title) {
            document.title = title
        }
    }, [title])
}

export default useTitle