import Radio, { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { NumberFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import { BORDER_TYPE } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
import AdvanceInputRangeFilter from "./AdvanceInputRangeFilter";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export function AdvanceInputRangeFilterStories() {
  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);
  const [isSmall, setIsSmall] = React.useState(false);


  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const [filter, dispatch] = React.useState<DemoFilter>(new DemoFilter());
  const [numberRange, setNumberRange] = React.useState<[]>([]);

  const handleChangeFilter = React.useCallback((value) => {
    setNumberRange({ ...value });
    dispatch({...filter, number: {lessEqual: value[0], greaterEqual: value[1]}})
  }, [filter]);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem message={"Field required!"}>
          <AdvanceInputRangeFilter
            type={type}
            placeHolderRange={["From...", "To..."]}
            valueRange={numberRange}
            onChangeRange={handleChangeFilter}
            isSmall={isSmall}
            label={"Ngày xuất kho"}
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
    </div>
  );
}
