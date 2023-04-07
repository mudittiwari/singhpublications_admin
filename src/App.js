import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addproduct from './Addproduct';
import Complains from './Complains';
import AdminLogin from './Adminlogin';
import Navbar from './Navbar';
import Blogs from './Blogs';
import Editblog from './Editblog';
function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
          <Route exact path="/addproduct" element={<Addproduct />} />
          <Route exact path="/complain" element={<Complains />} />
          <Route exact path="/login" element={<AdminLogin />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/editblog" element={<Editblog />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;