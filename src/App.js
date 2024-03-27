
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import compstore from './Redux/store';
import { ToastContainer } from 'react-toastify';
import Home from './Page/Home';


function App() {
  return (
    <Provider store={compstore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-right'></ToastContainer>
    </Provider>
  );
}

export default App;
