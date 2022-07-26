import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

const CheckBox = ({ list }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = (id) => {
        // 누른 것의 index를 구하고
        const currentIndex = checked.indexOf(id);

        // 전체 checked 된 state에서 현재 누른 checkbox가 없다면
        const newChecked = [...checked];
        if (currentIndex === -1) {
            // state에 넣어준다.
            newChecked.push(id);
        } else {
            // 없다면 뺴주고
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const renderCheckboxList = () =>
        // 가져오는 속도 차이가 있을 수 있어 list가 있는 지 확인
        list &&
        list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(value._id)}
                    checked={checked.indexOf(value._id) === -1 ? false : true}
                />
                <span>{value.name}</span>
            </React.Fragment>
        ));
    // 의미없는 div 사용을 피하려고 React.Fragment를 사용
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    );
};

export default CheckBox;
