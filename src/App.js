import logo from './logo.svg';
import './App.css';
import TodoTemplate from './component/todo/TodoTemplate';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Join from './component/user/Join';
import Login from './component/user/Login';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<TodoTemplate /> }/>
        <Route path='/Login' element={<Login /> }/>
        <Route path='/Join' element={<Join /> }/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
