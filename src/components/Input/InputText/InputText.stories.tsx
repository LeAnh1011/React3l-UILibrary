import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import React from "react";
import InputText, { INPUT_TEXT_TYPE } from "./InputText";
import { Radio, RadioChangeEvent } from "antd";
import FormItem from "../../FormItem/FormItem";
import { ValidateStatus } from "../../FormItem/FormItem";

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

export function InputTextStories() {
  const [inputValue, setInputVal] = React.useState();

  const [type, setType] = React.useState<INPUT_TEXT_TYPE>(
    INPUT_TEXT_TYPE.BORDERED
  );

  const [isSmall, setIsSmall] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isValidated, setValidated] = React.useState(false);

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeValue = React.useCallback((value) => {
    setInputVal(value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message={"Helper text"}
          validateStatus={isValidated ? ValidateStatus.error : null}
        >
          <InputText
            type={type}
            isSmall={isSmall}
            label="First Name"
            // prefix="Mr."
            suffix="Kg"
            showCount={true}
            maxLength={100}
            value={inputValue}
            onChange={handleChangeValue}
            placeHolder={"Enter text..."}
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
          <Radio value={INPUT_TEXT_TYPE.MATERIAL}>Material</Radio>
          <Radio value={INPUT_TEXT_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={INPUT_TEXT_TYPE.BORDERED}>Bordered</Radio>
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
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeValidated} value={isValidated}>
          <Radio value={true}>Validated</Radio>
          <Radio value={false}>Not Validated</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
