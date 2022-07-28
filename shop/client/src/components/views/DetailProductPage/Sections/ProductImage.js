import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImage = ({ detail }) => {
    const [Images, setImages] = useState([]);
    useEffect(() => {
        if (detail.images && detail.images.length > 0) {
            let images = [];

            detail.images.map((item) => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`,
                });
            });

            setImages((prev) => [...prev, ...images]);
        }
    }, [detail]); // detail의 값이 바뀔때마다 실행

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    );
};

export default ProductImage;
