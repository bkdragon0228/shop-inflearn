import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
    const AuthLandingPage = Auth(LandingPage, null);
    const AuthLoginPage = Auth(LoginPage, false);
    const AuthRegisterPage = Auth(RegisterPage, false);
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<AuthLandingPage />} />
                <Route path="/login" element={<AuthLoginPage />} />
                <Route path="/register" element={<AuthRegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
