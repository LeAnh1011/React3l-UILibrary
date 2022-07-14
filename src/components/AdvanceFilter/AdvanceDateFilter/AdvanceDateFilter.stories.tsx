import AdvanceDateFilter from "./AdvanceDateFilter";
import React from "react";
import { Moment } from "moment";
import { Radio, RadioChangeEvent } from "antd";
import { BORDER_TYPE } from "../../../config/enum";

export function AdvanceDateFilterStories() {
  const [value, setValue] = React.useState<Moment>();

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.FLOAT_LABEL);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isSmall, setIsSmall] = React.useState(false);
  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <AdvanceDateFilter
        type={type}
        onChange={handleChange}
        isSmall={isSmall}
        label="Ngày nhập hàng"
        placeholder={"Chọn ngày"}
        disabled={isDisabled}
        action={{
          name: "Help",
          action: () => console.log("Help incoming..."),
        }}
        value={value}
      />

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeDisabled} value={isDisabled}>
          <Radio value={true}>Disabled</Radio>
          <Radio value={false}>Not Disabled</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
