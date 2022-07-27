import React, { useState } from 'react';
import { Input } from 'antd';
const { Search } = Input;

const SearchOnClient = ({ refreshFunction }) => {
    const [searchValue, setSearchValue] = useState('');

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        refreshFunction(searchValue);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={searchHandler} value={searchValue} />
                <button type="submit">검색</button>
            </form>
            {/* <Search
                placeholder="filtering on client"
                onChange={searchHandler}
                style={{
                    width: 200,
                }}
                value={searchValue}
            /> */}
        </div>
    );
};

export default SearchOnClient;
