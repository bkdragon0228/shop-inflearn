import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';

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

const UploadProductPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [continent, setContinent] = useState(1);

    const [images, setImages] = useState([]);

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

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>여행 상품 업로드</Title>
            </div>

            <Form onSubmit>
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
                <Button>확인</Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;
