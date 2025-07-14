import { Link } from 'react-router-dom'
const Navigation = () => {
    return (
        <nav>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
        </nav>
    )
}

export default Navigation