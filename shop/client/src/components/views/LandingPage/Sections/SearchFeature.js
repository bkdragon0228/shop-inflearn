import React, { useState } from 'react';

import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;

const SearchFeature = ({ refreshFunction }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value);
        refreshFunction(searchTerm);
    };
    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{
                    width: 200,
                }}
                value={searchTerm}
                onSubmit
            />
        </div>
    );
};

export default SearchFeature;
