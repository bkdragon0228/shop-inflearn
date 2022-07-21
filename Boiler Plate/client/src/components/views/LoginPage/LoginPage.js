import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: email,
            password: password,
        };

        axios.post('/api/users/login', body).then((res) => {});
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

export default LoginPage;
