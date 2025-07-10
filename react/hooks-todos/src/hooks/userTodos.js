import { 
    useState,
    useEffect
 } from 'react';

export const useTodos = () => {
    
const [todos, setTodos] = useState(JSON.parse(
    localStorage.getItem('todos') || '[]'
))
useEffect(() => {
    // 接受字符串
   localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])
const addTodo = (text) => {
    setTodos([...todos,
        {
            id: Date.now(),
            text: text,
            isCompleted: false
        },
        
    ])
}
const onToggle = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
}
const onDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
}

return{
    todos,
    setTodos,
    addTodo,
    onToggle,
    onDelete
}
 




};
