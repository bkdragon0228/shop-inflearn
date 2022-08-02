import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

const RadioBox = ({ list, handleFilters }) => {
    const [Value, setValue] = useState(0); //price의 _id값을 넣어줌
    const renderRadioBox = () =>
        list &&
        list.map((item) => (
            <React.Fragment key={item._id}>
                <Radio value={item._id}>{item.name}</Radio>
            </React.Fragment>
        ));

    const handleChange = (e) => {
        //Value를 클릭한 radio의 value로 바꿔줌
        setValue(e.target.value);
        handleFilters(e.target.value);
    };
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
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
