import { Radio, RadioChangeEvent } from "antd";
import React from "react";
import { StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import InputView, { BORDER_TYPE } from "./InputView";

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

export function InputViewStories() {
  const [inputValue] = React.useState(
    "asfdsadasdfv asfdsadasdfv asfdsadasdfv asfdsadasdfv asfdsadasdfvasfdsadasdfv asfdsadasdfv asfdsadasdfv"
  );

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);

  const [isSmall, setIsSmall] = React.useState(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <InputView
          type={type}
          isSmall={isSmall}
          label="First Name"
          showCount={true}
          maxLength={100}
          value={inputValue}
          placeHolder={"Enter text..."}
        />
      </div>

      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
          <Radio value={BORDER_TYPE.NOT_BORDERED}>Not Bordered</Radio>
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
