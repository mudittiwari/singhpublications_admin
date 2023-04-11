import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addproduct from './Addproduct';
import Complains from './Orders';
import AdminLogin from './Adminlogin';
import Navbar from './Navbar';
import Products from './Products';
import Editproduct from './Editproduct';
import Orders from './Orders';
function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
          <Route exact path="/addproduct" element={<Addproduct />} />
          <Route exact path="/Orders" element={<Orders />} />
          <Route exact path="/login" element={<AdminLogin />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/editproduct" element={<Editproduct />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;