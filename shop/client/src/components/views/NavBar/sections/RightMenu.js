import React from 'react';
import { Menu, Badge } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function RightMenu(props) {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`api/users/logout`).then((response) => {
            if (response.status === 200) {
                navigate('/login');
            } else {
                alert('Log Out Failed');
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <Link to="/product/upload">Upload</Link>
                </Menu.Item>
                <Menu.Item key="cart">
                    <Link to="/user/cart">
                        <Badge count={3}>
                            <ClockCircleOutlined />
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        );
    }
}

export default RightMenu;
