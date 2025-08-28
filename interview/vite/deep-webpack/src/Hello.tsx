import React from 'react'
import avatar from './images/avatar.webp'
import book from './images/book.webp'
import { add, subtract, multiply, divide } from './math'


const Hello = () => {
    return <div>
        Hello World
        <img src={avatar} alt="avatar" />
        <img src={book} alt="book" />
        {add(1, 2)}
        </div>
}

export default Hello