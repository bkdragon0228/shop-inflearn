import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage';
import CartPage from './components/views/CartPage/CartPage';

function App() {
    const AuthLandingPage = Auth(LandingPage, null);
    const AuthLoginPage = Auth(LoginPage, false);
    const AuthRegisterPage = Auth(RegisterPage, false);
    const AuthUploadProductPage = Auth(UploadProductPage, true); // 로그인한 사람만
    const AuthDetailProductPage = Auth(DetailProductPage, null);
    const AuthCartPage = Auth(CartPage, true);
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<AuthLandingPage />} />
                <Route path="/login" element={<AuthLoginPage />} />
                <Route path="/register" element={<AuthRegisterPage />} />
                <Route path="/product/upload" element={<AuthUploadProductPage />} />
                <Route path="/product/:productId" element={<AuthDetailProductPage />} />
                <Route path="/user/cart" element={<AuthCartPage />} />
            </Routes>
        </Router>
    );
}

export default App;
