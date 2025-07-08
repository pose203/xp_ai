import { useState } from 'react'


const TodoForm = ({onAddTodo}) => {
    //props 和 state 都是数据
    // props 参数数据
    // state 私有的数据
    // 单向数据流
    const[text, setText] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        let result = text.trim();// dry dont repeat yourself
        if(!text.trim()) return;
        onAddTodo(result);
        setText('');//数据状态和界面状态一致要敏感

    }
    // jsx 一定得有唯一的最外层元素 树状编译解析jsx      
    return (
        
        <div>
        <h1 className="header">Todo List</h1>
        <form className="todo-input" onSubmit={handleSubmit}>
            <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} // 维护数据值与数据状态的同步
            placeholder="Add a new todo"
            required
            
            />
            <button type="submit">Add</button>
        </form>
        </div>
    )
}

export default TodoForm;