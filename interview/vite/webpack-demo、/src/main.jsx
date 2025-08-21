import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import Hello from './Hello.jsx';

createRoot(document.getElementById('app')).render(<Hello />);