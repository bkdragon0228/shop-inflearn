import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

const RadioBox = ({ list, handleFilters }) => {
    const [Value, setValue] = useState(0); //price의 _id값을 넣어줌
    const renderRadioBox = () =>
        list &&
        list.map((value) => (
            <React.Fragment key={value._id}>
                <Radio value={value._id}>{value.name}</Radio>
            </React.Fragment>
        ));

    const handleChange = (e) => {
        //Value를 클릭한 radio의 value로 바꿔줌
        setValue(e.target.value);
        handleFilters(e.target.value);
    };
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Price" key="1">
                    <Radio.Group value={Value} onChange={handleChange}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    );
};

export default RadioBox;
