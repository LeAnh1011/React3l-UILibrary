import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import React from "react";
import InputText from "./InputText";
import FormItem, { ValidateStatus } from "components/FormItem/FormItem";
import { Radio, RadioChangeEvent } from "antd";

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

export function InputTextStories() {

  const [inputValue, setInputVal] = React.useState();

  const [isMaterial, setIsMaterial] = React.useState<boolean>(false);
  const [isFloatLabel, setIsFloatLabel] = React.useState<boolean>(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value)
  }, []);

  const handleChangeLabelStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsFloatLabel(event.target.value)
  }, []);

  const handleChangeValue = React.useCallback((value) => {
    setInputVal(value);
  }, []);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message={"Helper text"}
        >
          <InputText
            isMaterial={isMaterial}
            label="First Name"
            floatLabel={isFloatLabel}
            prefix="Mr."
            showCount={true}
            maxLength={20}
            value={inputValue}
            onChange={handleChangeValue}
            placeHolder={"Enter text..."}
            action={{ name: "Help", action: () => console.log('Help incoming...') }}
          />
        </FormItem>
      </div>

      <div style={{ margin: "15px 0" }}>
        <FormItem>
          <InputText
            isMaterial={isMaterial}
            value={""}
            onChange={handleChangeValue}
            placeHolder={"Enter text..."}
            disabled
          />
        </FormItem>
      </div>

      <div style={{ marginTop: "10px" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          message={"Field required!"}
        >
          <InputText
            isMaterial={isMaterial}
            floatLabel={isFloatLabel}
            label="Sample"
            showCount={true}
            maxLength={20}
            value={inputValue}
            onChange={handleChangeValue}
            placeHolder={"Enter text..."}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeLabelStyle} value={isFloatLabel}>
          <Radio value={true}>Float label</Radio>
          <Radio value={false}>Default label</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
          <Radio value={true}>Material</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
