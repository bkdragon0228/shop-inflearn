import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const RadioBox = ({ list, handleFilters }) => {
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Price" key="1">
                    {}
                </Panel>
            </Collapse>
        </div>
    );
};

export default RadioBox;
