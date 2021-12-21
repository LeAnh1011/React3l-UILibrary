import React from 'react';
import AdvanceDateRangFilterMaster from './AdvanceDateRangFilterMaster';
import { Moment } from 'moment';

export function AdvanceDateRangeFilterMasterStories() {
  const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);
  const [item, setItem] = React.useState<any>(null);

  const handleChange = React.useCallback((item, dateMoment) => {
    setValue(dateMoment);
    setItem(item);
  }, []);


  return <div style={{ margin: '10px', width: '300px' }}>
    <AdvanceDateRangFilterMaster
      title={"Ngày giao hàng"}
      onChange={handleChange}
      activeItem={item}
      value={value} />
  </div>;
}