import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

const CheckBox = ({ list, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = (id) => {
        // 누른 것의 index를 구하고
        const currentIndex = checked.indexOf(id);

        const newChecked = [...checked];
        // 전체 checked 된 state에서 현재 누른 checkbox가 없다면
        if (currentIndex === -1) {
            // state에 넣어준다.
            newChecked.push(id);
        } else {
            // 있다면 뺴주고
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilters(newChecked);
    };
    const renderCheckboxList = () =>
        // 가져오는 속도 차이가 있을 수 있어 list가 있는 지 확인
        list &&
        list.map((item, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(item._id)}
                    checked={checked.indexOf(item._id) === -1 ? false : true}
                />
                <span>{item.name}</span>
            </React.Fragment>
        ));
    // 의미없는 div 사용을 피하려고 React.Fragment를 사용
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Continent" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    );
};

export default CheckBox;
