import React from 'react';
import Dropzone from 'react-dropzone';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = () => {
    const dropHandler = (files) => {
        // 이미지 전송에 필요한 form 전송
        let formData = new FormData();
        const config = {
            Headers: { 'content-type': 'multipart/form-data' },
        };
        formData.append('file', files[0]);

        axios.post('/api/product/image', formData, config).then((res) => {
            if (res.data.success) {
            } else {
                alert('fail to file upload');
            }
        });
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
        </div>
    );
};

export default FileUpload;
