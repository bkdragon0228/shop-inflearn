import React from 'react';
import { Carousel } from 'antd';

const imgStyle = {
    width: '100%',
    maxHeight: '150px',
};

const ImageSlider = ({ images }) => {
    return (
        <div>
            <Carousel autoplay effect="fade">
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
