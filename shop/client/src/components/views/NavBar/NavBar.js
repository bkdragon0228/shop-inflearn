import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link to="/register">Signup</Link>
            <Link to="/login">Signin</Link>
        </div>
    );
};

export default NavBar;
