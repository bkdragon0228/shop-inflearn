import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../../../_action/user_action';
import { useDispatch } from 'react-redux';

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navi = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: email,
            password: password,
        };

        // 액션을 만들고 dispatch로 발생시킨다.
        dispatch(loginUser(body)).then((res) => {
            console.log(res);
            if (res.payload.loginSuccess) {
                navi('/');
            }
        });
    };

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    return (
        <MainDiv>
            <Form onSubmit={onSubmitHandler}>
                <h2>Sign In</h2>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button>Login</button>
            </Form>
        </MainDiv>
    );
};

export default LoginPage;
