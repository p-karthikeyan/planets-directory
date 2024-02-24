import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Background from './containers/Background';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <App />
    <>
    <Background/>
    <App/>
    </>
);
