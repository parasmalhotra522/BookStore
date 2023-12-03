import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import ManageBooks from './components/ManageBooks';
import Orders from './components/Orders';
import Profile from './components/Profile';
import AddBook from './components/AddBook';

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Router>
    {isLoggedIn && <Navigation isLoggedIn={isLoggedIn} logout={handleLogout} />}
    <Routes>
      <Route path="/" exact element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}/>
      <Route path="/login" element={<Login onLogin={handleLogin} />}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/manage-books" element={<ManageBooks/>} />
      <Route path="/view-orders" element={<Orders/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/add-book" element={<AddBook/>} />
    </Routes>
  </Router>
  );
}

export default App;
