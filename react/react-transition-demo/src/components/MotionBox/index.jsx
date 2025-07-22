import { motion } from 'framer-motion'

const MotionBox = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{  backgroundColor: 'skyblue',padding:20 }}
        >
        </motion.div>
    )
}

export default MotionBox