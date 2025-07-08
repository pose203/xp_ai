import TodoItem from './TodoItem'
const TodoList = (props) => {
    const {
        todos,
        onToggle,
        onDelete

    } = props



    return (
        <ul className="todo-list">
            {/* TodoList */}
            {
                todos.length > 0 ? (
                    todos.map((todo) => 
                        <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    onToggle={() => onToggle(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                    
                    />
                    )
                ):(
                    <p>没有待办任务</p>
                )
            }
             {/* <TodoItem/> */}

            
        </ul>
    )
}

export default TodoList;