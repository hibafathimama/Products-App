import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import About from './pages/About';
import Products from './pages/Products';
import Login from './pages/Login.jsx';
import Viewproduct from './pages/Viewproduct.jsx';
import Contact from './pages/Contact.jsx'
import { AuthProvider } from "./Context/auth";
import PrivateRoute from './components/PrivateRoute.jsx';
import RegistrationPage from './pages/Registration.jsx'
import ProfilePage from "./pages/profile.jsx";

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>


           <Route path="/Products" element={<Products />} />


    <Route path="/" element={<Login />} />


          <Route
            path="/viewproduct/:id"
            element={
              <PrivateRoute>
            <Viewproduct />
              </PrivateRoute> }/>
          
          <Route path="/contact"  element={
           <PrivateRoute>
            <Contact />
           </PrivateRoute> } />

          <Route path="/about" element={
          <PrivateRoute>
            <About />
           </PrivateRoute> } />
           <Route path="/registration" element={<RegistrationPage />} />
            <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
            />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;