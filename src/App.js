import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Products from './pages/Products';
import Login from './pages/Login.jsx';
import Viewproduct from './pages/Viewproduct.jsx';
import Contact from './pages/Contact.jsx'

import { AuthProvider } from "./Context/auth";

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>


          <Route path="/" element={<Products />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/viewproduct/:id"
            element={<Viewproduct />}
          />
          
          <Route path="/contact"  element={<Contact />} />

          <Route path="/about" element={<About />} />


        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;