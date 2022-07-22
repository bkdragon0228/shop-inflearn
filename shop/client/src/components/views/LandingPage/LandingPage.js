import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navi = useNavigate();
    useEffect(() => {
        axios.get('/api/hello').then((res) => console.log(res));
    }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout').then((res) => {
            if (res.data.success) {
                navi('/login');
            } else {
                alert('로그아웃에 실패했습니다.');
            }
        });
    };
    return (
        <div>
            LandingPage
            <button onClick={onClickHandler}>Logoout</button>
        </div>
    );
};

export default LandingPage;
