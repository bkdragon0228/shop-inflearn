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

import styled, { keyframes } from 'styled-components';

const animation = keyframes`

    50% {
        transform: scale(1.3);
    }
`;
const Title = styled.div`
    color: ${(props) => props.theme.textColor};

    h1 {
        font-size: 30px;
        margin: 0 0 10px 0;
    }
`;

const Notice = styled.div`
    padding: 20px;
    border: 2px solid #aaa;
    background-color: ${(props) => props.theme.backgroundColor};

    ${Title}:hover {
        color: red;
    }
`;

const Button = styled.button`
    display: block;
    padding: 6px 10px;
    color: #fff;
    font-size: 18px;
    border-radius: 3px;
    background-color: crimson;
    border: 0;

    &:hover {
        background-color: teal;
    }
`;

const FullButton = styled(Button)`
    width: 100%;
    border-radius: 4px;
    animation: ${animation} 1s infinite;
`;

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
            {/* <div>
                <Notice>
                    <Title>
                        <h1>아아 공지를 읽으세요 📢</h1>
                        <h2>작성자: bkboy</h2>
                    </Title>
                    <FullButton>확인 : animation</FullButton>
                    <Button>확인</Button>
                </Notice>
            </div> */}
            <Routes>
                <Route path="/" element={<AuthLandingPage />} />
                <Route path="/login" element={<AuthLoginPage />} />
                <Route path="/register" element={<AuthRegisterPage />} />
                <Route
                    path="/product/upload"
                    element={<AuthUploadProductPage />}
                />
                <Route
                    path="/product/:productId"
                    element={<AuthDetailProductPage />}
                />
                <Route path="/user/cart" element={<AuthCartPage />} />
            </Routes>
        </Router>
    );
}

export default App;
