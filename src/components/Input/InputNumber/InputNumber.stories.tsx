import React from "react";
import InputNumber, { DECIMAL, LONG } from "./InputNumber";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../../FormItem/FormItem";
import { ValidateStatus } from "./../../../config/enum";
import { BORDER_TYPE } from "./../../../config/enum";

export function InputNumberStories() {
  const [numberType, setNumberType] = React.useState<string>(LONG);

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);

  const [isReverse, setIsReverse] = React.useState(false);

  const [isPositive, setIsPositive] = React.useState(false);

  const [isSmall, setIsSmall] = React.useState(false);

  const [iconName] = React.useState("");

  const [isDisabled, setIsDisabled] = React.useState(false);

  const [isValidated, setValidated] = React.useState(false);

  const [value, setValue] = React.useState();

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
    setValue(value);
  }, []);

  const handleChangeType = React.useCallback(
    (event: RadioChangeEvent) => {
      setNumberType(event.target.value);
      setValue(undefined);
    },
    [setValue]
  );

  const handleChangeSeperation = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsReverse(event.target.value);
      setValue(undefined);
    },
    [setValue]
  );

  const handleChangePositive = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsPositive(event.target.value);
      setValue(undefined);
    },
    [setValue]
  );

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message="Helper"
          validateStatus={isValidated ? ValidateStatus.error : null}
        >
          <InputNumber
            type={type}
            label="Label"
            prefix="Age"
            placeHolder={"Enter number..."}
            className={iconName}
            value={value}
            onChange={handleChangeValue}
            numberType={numberType}
            isReverseSymb={isReverse}
            allowPositive={isPositive}
            isSmall={isSmall}
            disabled={isDisabled}
            action={{
              name: "Help",
              action: () => console.log("Help incoming..."),
            }}
          />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeType} value={numberType}>
          <Radio value={DECIMAL}>Decimal</Radio>
          <Radio value={LONG}>Long</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSeperation} value={isReverse}>
          <Radio value={true}>Reverse Seperation</Radio>
          <Radio value={false}>Normal</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangePositive} value={isPositive}>
          <Radio value={true}>Allow Positive</Radio>
          <Radio value={false}>Not Allow Positive</Radio>
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
