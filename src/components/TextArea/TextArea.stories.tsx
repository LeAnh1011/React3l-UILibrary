import { storiesOf } from "@storybook/react";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import nameof from "ts-nameof.macro";
import FormItem from "../FormItem/FormItem";
import TextArea from "./TextArea";
import { BORDER_TYPE } from "./../../config/enum";
import { ValidateStatus } from "./../../config/enum";

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

function Default() {
  const [inputValue, setInputVal] = React.useState();

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);

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

  return (
    <div style={{ width: "244px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message="Helper"
          validateStatus={isValidated ? ValidateStatus.error : null}
        >
          <TextArea
            type={type}
            label="First Name"
            showCount={true}
            maxLength={100}
            value={inputValue}
            onChange={handleChangeValue}
            placeHolder={"Enter text..."}
            disabled={isDisabled}
            action={{
              name: "Help",
              action: () => {},
            }}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <div style={{ margin: "10px", width: "300px" }}>
          <Radio.Group onChange={handleChangeStyle} value={type}>
            <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
            <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
            <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
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
    </div>
  );
}

storiesOf("TextArea", module).add(nameof(Default), Default);
