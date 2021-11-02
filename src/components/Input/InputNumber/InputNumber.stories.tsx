import React, { Reducer } from "react";
import InputNumber, { DECIMAL, LONG } from "./InputNumber";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { ModelFilter } from "react3l-common";
import { NumberFilter } from "react3l-advanced-filters";
import FormItem, { ValidateStatus } from "components/FormItem/FormItem";
import { AdvanceFilterAction, advanceFilterReducer, Filter } from "services/advance-filter-service";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export function InputNumberStories() {
  const [numberType, setNumberType] = React.useState<string>(LONG);

  const [isMaterial, setIsMaterial] = React.useState<boolean>(false);

  const [isReverse, setIsReverse] = React.useState(false);

  const [isPositive, setIsPositive] = React.useState(false);

  const [iconName,] = React.useState("");

  const [filter,] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, Filter>>
  >(advanceFilterReducer, new DemoFilter());

  const [value, setValue] = React.useState();

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value)
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

  React.useEffect(() => { }, [filter]);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message="Helper"
        >
          <InputNumber
            isMaterial={isMaterial}
            label="Label"
            floatLabel={true}
            prefix="Age"
            placeHolder={"Enter number..."}
            className={iconName}
            value={value}
            onChange={handleChangeValue}
            numberType={numberType}
            isReverseSymb={isReverse}
            allowPositive={isPositive}
            action={{ name: "Help", action: () => console.log('Help incoming...') }}
          />
        </FormItem>
      </div>

      <div style={{ margin: "15px 0" }}>
        <InputNumber
          isMaterial={isMaterial}
          value={0}
          onChange={() => { }}
          placeHolder={"Enter number..."}
          className={iconName}
          disabled
        />
      </div>

      <div style={{ margin: "15px 0" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          message={"Field required!"}
        >
          <InputNumber
            isMaterial={isMaterial}
            label={"Title Form: "}
            placeHolder={"Enter number..."}
            className={iconName}
            value={value}
            onChange={handleChangeValue}
            numberType={numberType}
            isReverseSymb={isReverse}
            allowPositive={isPositive}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
          <Radio value={true}>Material</Radio>
          <Radio value={false}>Default</Radio>
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
    </div>
  );
}
