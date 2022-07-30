import React from 'react';
import ReactDOM from 'react-dom/client';
import Sequencer from './components/Sequencer';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Sequencer />
  </React.StrictMode>
);
