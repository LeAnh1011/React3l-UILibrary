import React from 'react';
import AdvanceDateRangFilterMaster, { ADVANCE_DATE_RANGE_TYPE } from './AdvanceDateRangFilterMaster';
import { Moment } from 'moment';
import { Radio, RadioChangeEvent } from 'antd';
import { BORDER_TYPE } from '../../../config/enum';

export function AdvanceDateRangeFilterMasterStories() {
  const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);
  const [item, setItem] = React.useState<any>(null);
  const [type, setType] = React.useState<ADVANCE_DATE_RANGE_TYPE>(ADVANCE_DATE_RANGE_TYPE.SHORT);
  const [typeInput, setTypeInput] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);
  const handleChange = React.useCallback((item, dateMoment) => {
    debugger
    setValue(dateMoment);
    setItem(item);
  }, []);


  const handleChangeTyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setTypeInput(event.target.value);
  }, []);

  return <div style={{ margin: '10px', width: '300px' }}>
    <AdvanceDateRangFilterMaster
      title={"Ngày giao hàng"}
      onChange={handleChange}
      activeItem={item}
      type={type}
      value={value}
      inputType={typeInput}
      appendToBody={false}
    />

    <div style={{ margin: "10px", width: "400px" }}>
      <Radio.Group onChange={handleChangeTyle} value={type}>
        <Radio value={ADVANCE_DATE_RANGE_TYPE.SHORT}>SHORT</Radio>
        <Radio value={ADVANCE_DATE_RANGE_TYPE.INPUT}>Input</Radio>
      </Radio.Group>
    </div>
    {
      type === ADVANCE_DATE_RANGE_TYPE.INPUT && (
        <>
          <div style={{ margin: "10px", width: "400px" }}>
            <Radio.Group onChange={handleChangeStyle} value={typeInput}>
              <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
              <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
              <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
            </Radio.Group>
          </div>
        </>
      )
    }
  </div>;
}