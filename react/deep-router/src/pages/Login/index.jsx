import { useState } from "react";
import { 
    useNavigate,// Navigate 组件 js 跳转
    useLocation

} from "react-router-dom";

const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    // console.log(location.state.from);
    const navigate = useNavigate();// navigate 能力
    

    const handleSubmit = (event) =>{
        event.preventDefault();
       // console.log(username, password);
       if(username === 'admin' && password === '123456'){
        localStorage.setItem('isLogin', 'true');
        navigate(location.state.from || '/');
       }else{
        alert('用户名或密码错误');
       }
    }

    return (
        <form onSubmit={handleSubmit}>

            <h1>Login</h1>
            <input 
            type="text" 
            placeholder="username" 
            required
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            />
            <input 
            type="password" 
            placeholder="password" 
            required
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;