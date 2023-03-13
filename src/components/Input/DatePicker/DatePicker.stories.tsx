import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { Moment } from "moment";
import React from "react";
import { BORDER_TYPE, ValidateStatus } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
import DatePicker from "./DatePicker";

export function DatePickerStories() {
  const [value, setValue] = React.useState<Moment>();

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.FLOAT_LABEL);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isSmall, setIsSmall] = React.useState(false);

  const [isValidated, setValidated] = React.useState(false);

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  return (
    <div style={{ margin: "10px", width: "220px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={"Helper text"}
        >
          <DatePicker
            type={type}
            isSmall={isSmall}
            label="Ngày nhập hàng"
            placeholder={"Enter text..."}
            onChange={handleChange}
            disabled={isDisabled}
            value={value}
          />
        </FormItem>
      </div>
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
    </div>
  );
}
