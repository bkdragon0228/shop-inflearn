import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';

function App() {
    const AuthLandingPage = Auth(LandingPage, null);
    const AuthLoginPage = Auth(LoginPage, false);
    const AuthRegisterPage = Auth(RegisterPage, false);
    const AuthUploadProductPage = Auth(UploadProductPage, true); // 로그인한 사람만
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<AuthLandingPage />} />
                <Route path="/login" element={<AuthLoginPage />} />
                <Route path="/register" element={<AuthRegisterPage />} />
                <Route
                    path="/product/upload"
                    element={<AuthUploadProductPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
