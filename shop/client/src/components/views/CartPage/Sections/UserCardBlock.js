import React from 'react';
import styled, { css } from 'styled-components';

const TableContainer = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const talbeUtil = css`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;
const TableRow = styled.tr`
    ${talbeUtil}
    &:nth-child(1) {
        background-color: #dddddd;
    }
`;

const TableData = styled.td`
    ${talbeUtil}
`;
const UserCardBlock = ({ products }) => {
    // helper method
    const renderImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    };
    // helper method
    const renderItems = () =>
        products &&
        products.map((product, index) => (
            <TableRow key={index}>
                <TableData>
                    <img style={{ width: '70px' }} alt="product" src={renderImage(product.images)}></img>
                </TableData>
                <TableData>{product.quantity}</TableData>
                <TableData>{product.price}</TableData>
                <TableData>
                    <button>Romove</button>
                </TableData>
            </TableRow>
        ));

    return (
        <div>
            <TableContainer>
                <thead>
                    <TableRow>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </TableRow>
                </thead>
                <tbody>{renderItems()}</tbody>
            </TableContainer>
        </div>
    );
};

export default UserCardBlock;
