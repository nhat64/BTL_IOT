import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import History from './components/History';
import Data from './components/Data';
import Navbar from './components/Navbar';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={
        <>
          <Navbar />
          <MyProfile />
        </>
      } />
      <Route path='/history' element={
        <>
          <Navbar />
          <History />
        </>
      } />
      <Route path='/data' element={
        <>
          <Navbar />
          <Data />
        </>
      } />
    </Routes>
  );
}

export default App;
