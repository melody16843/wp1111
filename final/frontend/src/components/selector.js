import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const citys = ['台北','桃園',"新竹","苗栗",'台中','彰化','雲林','嘉義','台南','高雄','屏東','宜蘭','花蓮','台東']
const costs = ['$5000-$10000','$10000-$15000']
const days = ['一日遊','兩天一夜']


const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Selector = () => (
    <Select
    mode="multiple"
    style={{
        width: '100%',
        height: "38px"
    }}
    placeholder="select one country"
    defaultValue={['台北']}
    onChange={handleChange}
    optionLabelProp="label"
    >
        {citys.map( (option) => {
            return (
                <Option value={option} label={option} key={option}>
                    <div className="demo-option-label-item">
                        <span role="img" aria-label={option}>
                        </span>
                        {option}
                    </div>
                </Option>
            )}     
        )}

        {costs.map( (option) => {
            return (
                <Option value={option} label={option} key={option}>
                    <div className="demo-option-label-item">
                        <span role="img" aria-label={option}>
                        </span>
                        {option}
                    </div>
                </Option>
            )}     
        )}

        {days.map( (option) => {
            return (
                <Option value={option} label={option} key={option}>
                    <div className="demo-option-label-item">
                        <span role="img" aria-label={option}>
                        </span>
                        {option}
                    </div>
                </Option>
            )}     
        )}

    </Select>
  
);
export default Selector;