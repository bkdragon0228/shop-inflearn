import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const NavDiv = styled.div`
    position : relative;
    width : 100%
    height : 5rem
`;

const SignDiv = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    width: 100px;
    right: 100px;
`;

const NavBar = () => {
    const user = useSelector((state) => state.user);
    const navi = useNavigate();

    const logoutHanlder = () => {
        axios.get('/api/users/logout').then((res) => {
            if (res.data.success) {
                navi('/login');
            } else {
                alert('Log Out Failed');
            }
        });
    };

    // 로그인 전
    if (user.userData && !user.userData.isAuth) {
        return (
            <NavDiv>
                <SignDiv>
                    <Link to="/register">Signup</Link>
                    <Link to="/login">Signin</Link>
                </SignDiv>
            </NavDiv>
        );
    } else {
        return (
            // 로그인 후
            <NavDiv>
                <SignDiv>
                    <Link to="/product/upload">Upload</Link>
                    <a onClick={logoutHanlder}>logout</a>
                </SignDiv>
            </NavDiv>
        );
    }
};

export default NavBar;
