import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImage = ({ detail }) => {
    const [Images, setImages] = useState([]);
    useEffect(() => {
        // props으로 받아오는 값이 때문에 받아오는 속도가 다를 수 있음.
        if (detail.images && detail.images.length > 0) {
            let images = [];

            detail.images.map((item) => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`,
                });
            });

            setImages(images);
        }
    }, [detail]); // detail의 값이 바뀔때마다 실행, detail이 없을때 useEffect가 실행되면 useEffect 내부 작업을 실행 할 수 없으니 detail 값을 트리거로 삼은 것.

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    );
};

export default ProductImage;
