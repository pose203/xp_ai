import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import BatchParser from './pages/BatchParser';
import Instructions from './pages/Instructions';
import About from './pages/About';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Tools />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="batch" element={<BatchParser />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
