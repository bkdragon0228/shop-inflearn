import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';
import { useNavigate } from 'react-router-dom';

export default function Auth(SpecificComponent, option, adminRoute = null) {
    // option
    // null => 아무나 출입가능
    // trun => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능

    //세번째 인자는 어드민 유저만 출입가능하게 하고싶을 때 true
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navi = useNavigate();

        useEffect(() => {
            dispatch(auth()).then((res) => {
                // 로그인 하지 않은 상태
                if (!res.payload.isAuth) {
                    if (option) {
                        navi('/login');
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !res.payload.isAdmin) {
                        navi('/');
                    } else {
                        if (!option) {
                            navi('/');
                        }
                    }
                }
            });
        }, []);

        return <SpecificComponent />;
    }
    return AuthenticationCheck;
}
