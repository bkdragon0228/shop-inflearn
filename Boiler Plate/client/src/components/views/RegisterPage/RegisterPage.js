import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_action/user_action';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
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
const RegisterPage = () => {
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
        dispatch(loginUser(body)).then((res) => {
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

export default RegisterPage;
