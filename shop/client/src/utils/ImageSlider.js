import React, { useState } from 'react';
import { Carousel, Radio } from 'antd';
import styled from 'styled-components';

const imgStyle = {
    width: '100%',
    height: '150px',
};

const RadioContainer = styled(Radio.Group)`
    display: none;
`;

const ImageSlider = ({ images }) => {
    const [dotPosition, setDotPosition] = useState('right');

    const handlePositionChange = ({ target: { value } }) => {
        setDotPosition(value);
    };
    return (
        <div>
            <RadioContainer
                onChange={handlePositionChange}
                value={dotPosition}
                style={{
                    marginBottom: 8,
                }}
            >
                <Radio.Button value="top">Top</Radio.Button>
                <Radio.Button value="bottom">Bottom</Radio.Button>
                <Radio.Button value="left">Left</Radio.Button>
                <Radio.Button value="right">Right</Radio.Button>
            </RadioContainer>
            <Carousel autoplay effect="fade" dotPosition={dotPosition}>
                {images.map((img, idx) => {
                    return (
                        <div key={idx}>
                            <img
                                style={imgStyle}
                                src={`http://localhost:5000/${img}`}
                            />
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default ImageSlider;
