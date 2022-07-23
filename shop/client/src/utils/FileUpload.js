import React from 'react';
import Dropzone from 'react-dropzone';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const FileUpload = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
