import React from "react";
import InputSelect, { INPUT_SELECT_TYPE } from "./InputSelect";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import FormItem, { ValidateStatus } from "../../FormItem/FormItem";

export function InputSelectStories() {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [type, setType] = React.useState<INPUT_SELECT_TYPE>(
    INPUT_SELECT_TYPE.BORDERED
  );

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isValidated, setValidated] = React.useState(false);

  const [isSmall, setIsSmall] = React.useState(false);

  const handleExpanded = React.useCallback((event: RadioChangeEvent) => {
    setExpanded(event.target.value);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  return (
    <>
      <div style={{ margin: "10px", width: "300px" }}>
        <div style={{ margin: "15px 0" }}>
          <FormItem
            message={"Helper text"}
            validateStatus={isValidated ? ValidateStatus.error : null}
          >
            <InputSelect
              type={type}
              label="Label"
              expanded={expanded}
              placeHolder={"Select an option"}
              disabled={isDisabled}
              isSmall={isSmall}
            />
          </FormItem>
        </div>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={INPUT_SELECT_TYPE.MATERIAL}>Material</Radio>
          <Radio value={INPUT_SELECT_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={INPUT_SELECT_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleExpanded} value={expanded}>
          <Radio value={true}>Open Select</Radio>
          <Radio value={false}>Close Select</Radio>
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

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
      </div>
    </>
  );
}
