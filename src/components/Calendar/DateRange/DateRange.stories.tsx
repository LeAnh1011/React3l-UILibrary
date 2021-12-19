import React from 'react';
import DateRange, { DATE_RANGE_TYPE } from './DateRange';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Moment } from 'moment';
import FormItem, { ValidateStatus } from '../../FormItem/FormItem';

export function DateRangeStories() {
  const [isMaterial, setIsMaterial] = React.useState(false);

  const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);

  const [isValidated, setValidated] = React.useState(false);

  const [type, setType] = React.useState<DATE_RANGE_TYPE>(
    DATE_RANGE_TYPE.FLOAT_LABEL
  );

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isSmall, setIsSmall] = React.useState(false);

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);


  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);


  return <div style={{ margin: '10px', width: '300px' }}>

    <div style={{ margin: '10px', width: '300px' }}>
      <FormItem
        validateStatus={isValidated ? ValidateStatus.error : null}
        message={'Helper text'}>
        <DateRange type={type}
          isSmall={isSmall}
          label="Ngày nhập hàng"
          placeHolder={'Chọn ngày'}
          onChange={handleChange}
          value={value}
          disabled={isDisabled}
          action={{
            name: "Help",
            action: () => console.log("Help incoming..."),
          }}
        />
      </FormItem>
    </div>

    <div style={{ margin: "10px", width: "300px" }}>
      <Radio.Group onChange={handleChangeStyle} value={type}>
        <Radio value={DATE_RANGE_TYPE.MATERIAL}>Material</Radio>
        <Radio value={DATE_RANGE_TYPE.FLOAT_LABEL}>Float Label</Radio>
        <Radio value={DATE_RANGE_TYPE.BORDERED}>Bordered</Radio>
      </Radio.Group>
    </div>

    <div style={{ margin: "10px", width: "300px" }}>
      <Radio.Group onChange={handleChangeSize} value={isSmall}>
        <Radio value={true}>Small</Radio>
        <Radio value={false}>Default</Radio>
      </Radio.Group>
    </div>

    <div style={{ margin: "10px", width: "300px" }}>
      <Radio.Group onChange={handleChangeValidated} value={isValidated}>
        <Radio value={true}>Validated</Radio>
        <Radio value={false}>Not Validated</Radio>
      </Radio.Group>
    </div>

    <div style={{ margin: "10px", width: "300px" }}>
      <Radio.Group onChange={handleChangeDisabled} value={isDisabled}>
        <Radio value={true}>Disabled</Radio>
        <Radio value={false}>Not Disabled</Radio>
      </Radio.Group>
    </div>

  </div>;
}