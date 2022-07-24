import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = () => {
    const [images, setImages] = useState([]);
    const dropHandler = (files) => {
        // 이미지 전송에 필요한 form 전송
        let formData = new FormData();
        const config = {
            Headers: { 'content-type': 'multipart/form-data' },
        };
        formData.append('file', files[0]);

        axios.post('/api/product/image', formData, config).then((res) => {
            if (res.data.success) {
                setImages((prev) => [...prev, res.data.filePath]);
            } else {
                alert('fail to file upload');
            }
        });
    };

    const deleteHandler = (img) => {
        const currentIndex = images.indexOf(img);
        console.log(currentIndex);

        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        setImages(newImages);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300,
                                height: 240,
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <EditOutlined
                                type="plus"
                                style={{ fontSize: '3rem' }}
                            />
                        </div>
                    </section>
                )}
            </Dropzone>

            <div>
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            width: '350px',
                            height: '240px',
                            overflowX: 'scroll',
                        }}
                        onClick={() => deleteHandler(img)} // 파라미터가 있는 함수를 쓸 땐 이렇게!
                    >
                        <img
                            style={{
                                minWidth: '300px',
                                width: '300px',
                                height: '240px',
                            }}
                            src={`http://localhost:5000/${img}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
