import { useState } from 'react'
import './App.css'
import VirtualList from './components/VirtualList'

const generateData = (count) => 
  Array.from({length: count}, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: 
      `This is item number ${i}, rendered with virtual scrolling`
  }))


function App() {
  const data = generateData(10000);


  const renderItem = (item,index) => (
    <div
    style={{
      padding: '10px',
      borderBottom: '1px solid #ccc',
      backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#fff'
    }}
   
    >
      <strong>[{index}]</strong> {item.name}
      <p
      style={{
        margin: '4px 0',
        fontSize: '0.9em',
        color: '#666'
      }}
      >{item.description}</p>


    </div>
  )
  
  return (
    <div style={{paddding:'20px',fontFamily:'Arial'}}>
      <h1>Virtual List Demo</h1>
      <p>smooth scrolling with VirtualList</p>
      <VirtualList
      data={data}
      height={window.innerHeight-100}
      itemHeight={80}
      renderItem={renderItem}
      overscan={3}  /*预渲染上下各3个额外节点*/
      />
    </div>
  )
}

export default App