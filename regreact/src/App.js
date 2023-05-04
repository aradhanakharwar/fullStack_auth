import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './common/Navbar';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';
import AllUser from './components/AllUser';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/allusers" element={<AllUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
