import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../../utils/FileUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Europe' },
    { key: 3, value: 'Asia' },
    { key: 4, value: 'America' },
    { key: 5, value: 'Australia' },
    { key: 6, value: 'Antarctica' },
];

const UploadProductPage = ({ user }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [continent, setContinent] = useState(1);

    const [images, setImages] = useState([]);

    const navi = useNavigate();

    const nameChangeHandler = (e) => {
        setName(e.currentTarget.value);
    };
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    };
    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    };
    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value);
    };

    // 히위 컴포넌트의 state를 받아온 함수
    const updateImages = (newImages) => {
        setImages(newImages);
    };
    const submitHandler = (e) => {
        e.preventDefault(); // 자동 새로고침 방지

        if (!name || !price || !description || !images) {
            return alert('fail to upload');
        }

        // 채운 값들을 서버에 보낸다.

        const body = {
            writer: user.userData._id, // 유저아이디가 들어간다. 후에 populate로 참조하기 위해
            title: name,
            description: description,
            price: price,
            images: images,
            continent: continent,
        };

        axios.post('/api/product', body).then((res) => {
            if (res.data.success) {
                alert('상품 업로드에 성공 했습니다.');
                navi('/');
            } else {
                alert('상품 업로드에 실패 했습니다.');
            }
        });
    };
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> 상품 업로드</Title>
            </div>
            <Form onSubmitCapture={submitHandler}>
                <FileUpload
                    refreshFunction={(newImages) => updateImages(newImages)}
                />

                <br />
                <br />
                <label>이름</label>
                <Input value={name} onChange={nameChangeHandler} />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    value={description}
                    onChange={descriptionChangeHandler}
                />
                <br />
                <br />
                <label>가격($)</label>
                <Input value={price} onChange={priceChangeHandler} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={continent}>
                    {Continents.map((ele) => {
                        return (
                            <option key={ele.key} value={ele.key}>
                                {ele.value}
                            </option>
                        );
                    })}
                </select>
                <br />
                <br />
                <Button htmlType="submit">확인</Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;
