import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import React from "react";
import InputText, { INPUT_TEXT_TYPE } from "./InputText";
import FormItem, { ValidateStatus } from "components/FormItem/FormItem";
import { Radio, RadioChangeEvent } from "antd";
import { INPUT_NUMBER_TYPE } from "index";

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
        <FormItem message={"Helper text"}>
          <InputText
            type={type}
            label="First Name"
            prefix="Mr."
            showCount={true}
            maxLength={20}
            value={inputValue}
            onChange={handleChangeValue}
            placeHolder={"Enter text..."}
            action={{
              name: "Help",
              action: () => console.log("Help incoming..."),
            }}
          />
        </FormItem>
      </div>

      <div style={{ margin: "15px 0" }}>
        <FormItem>
          <InputText
            type={type}
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
            type={type}
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
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={INPUT_NUMBER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={INPUT_NUMBER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={INPUT_NUMBER_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
