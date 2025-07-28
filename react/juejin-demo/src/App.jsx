import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    // Add the console log that was in the original HTML
    console.log('%c想要加入稀土掘金？投递简历：https://job.toutiao.com/s/idq6X5rb','color:#1e80ff;');
  }, []);

  return (
    <div className="juejin-page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/following" element={<Home />} />
        <Route path="/recommended" element={<Home />} />
        <Route path="/hot/articles" element={<Home />} />
        <Route path="/backend" element={<Home />} />
        <Route path="/frontend" element={<Home />} />
        <Route path="/android" element={<Home />} />
        <Route path="/ios" element={<Home />} />
        <Route path="/ai" element={<Home />} />
        {/* 其他路由可以在这里添加 */}
      </Routes>
      </div>
  );
}

export default App;
