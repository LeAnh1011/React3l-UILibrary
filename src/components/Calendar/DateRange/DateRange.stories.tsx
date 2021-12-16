import React from 'react';
import DateRange from './DateRange';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Moment } from 'moment';
import FormItem, { ValidateStatus } from '../../FormItem/FormItem';

export function DateRangeStories() {
  const [isMaterial, setIsMaterial] = React.useState(false);

  const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
  }, []);

  return <div style={{ margin: '10px', width: '250px' }}>
    <DateRange isMaterial={isMaterial}
      onChange={handleChange}
      value={value} />

    <div style={{ margin: '10px', width: '300px' }}>
      <FormItem
        validateStatus={ValidateStatus.error}
        message={'Field required!'}>
        <DateRange isMaterial={isMaterial}
          onChange={handleChange}
          value={value} />
      </FormItem>
    </div>

    <div style={{ margin: '10px', width: '300px' }}>
      <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
        <Radio value={true}>Material Style</Radio>
        <Radio value={false}>Normal Style</Radio>
      </Radio.Group>
    </div>

  </div>;
}