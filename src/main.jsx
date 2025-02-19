import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import store from './store'; 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
);
