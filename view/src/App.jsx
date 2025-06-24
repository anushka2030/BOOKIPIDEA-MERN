import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
// import ForgotPassword from './pages/ForgotPassword';
import './index.css';
// import ResetPassword from './pages/ResetPassword';
import { authActions } from './store/auth';
import Favourites from './components/Profile/Favourites';
import Settings from './components/Profile/Settings';
import UserOrderHistory from './components/Profile/OrderHistory';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import AboutUs from './pages/AboutUs';
import ScrollToTop from './components/ScrollToTop';


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem('id') &&
      localStorage.getItem('token') &&
      localStorage.getItem('role')
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <ScrollToTop/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
        {role === "user" ? <Route index element={<Favourites />} /> : <Route index element = {<AllOrders/>}/> }
        {role === "admin" &&   <Route  path="add-book" element={<AddBook />} />}
          <Route  path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path = "/updateBook/:id" element = {<UpdateBook/>}/>
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails/>} />
       
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
