import React from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

const CheckBox = ({ list }) => {
    const renderCheckboxList = () =>
        // 가져오는 속도 차이가 있을 수 있어 list가 있는 지 확인
        list &&
        list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox onChange>
                    <span>{value.name}</span>
                </Checkbox>
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
