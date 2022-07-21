import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_action/user_action';
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
const RegisterPage = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navi = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('비밀번화와 비밀번호 확인이 다름니다.');
        }

        let body = {
            name,
            email: email,
            password: password,
        };
        dispatch(registerUser(body)).then((res) => {
            if (res.payload.success) {
                navi('/');
            } else {
                alert('faild to sign up');
            }
        });
    };
    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    };
    return (
        <MainDiv>
            <Form onSubmit={onSubmitHandler}>
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />

                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={onConfirmPasswordHandler}
                />

                <br />
                <button>Sign Up</button>
            </Form>
        </MainDiv>
    );
};

export default RegisterPage;
