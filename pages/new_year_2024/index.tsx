import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const imgAssets = {
  nightBg: require('../../public/assets/bg_night.jpg'),
};

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <div>
      <div className="code">new Year 2024</div>
      <div className="box-bg">123 123 134</div>
      <img className="box-img" src={imgAssets.nightBg}></img>
    </div>
  </React.StrictMode>
);
