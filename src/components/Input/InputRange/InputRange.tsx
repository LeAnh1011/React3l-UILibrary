import { BORDER_TYPE } from "@Configs/enum";
import React from "react";
import InputNumber, { InputNumberProps } from "../InputNumber/InputNumber";
import "./InputRange.scss";

export interface InputRangeProps extends InputNumberProps {
  /**User-filled values*/
  valueRange: [number, number] | [];
  /**Placeholder of the component*/
  placeHolderRange?: [string, string];
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Handle the change [fromNumber, toNumber] of the component*/
  onChangeRange: (T: [number, number]) => void;
  /**Control the size of the component*/
  isSmall?: boolean;
}

function InputRange(props: InputRangeProps) {
  const {
    valueRange,
    type = 0,
    placeHolderRange = [null, null],
    onChangeRange,
    isSmall,
  } = props;

  const validateRange = React.useCallback((fromValue, toValue) => {
    if (typeof fromValue === "undefined" || typeof toValue === "undefined")
      return true;
    if (fromValue > toValue) return false;
    return true;
  }, []);

  const handleBlurFrom = React.useCallback(
    (number: number) => {
      if (validateRange(number, valueRange[1])) {
        onChangeRange([number, valueRange[1]]);
      } else {
        onChangeRange([undefined, undefined]);
      }
    },
    [onChangeRange, valueRange, validateRange]
  );

  const handleBlurTo = React.useCallback(
    (number: number) => {
      if (validateRange(valueRange[0], number)) {
        onChangeRange([valueRange[0], number]);
      } else {
        onChangeRange([undefined, undefined]);
      }
    },
    [onChangeRange, valueRange, validateRange]
  );

  return (
    <>
      <div className="input-range__container">
        <div className="input-range__input-number m-r--2xs">
          <InputNumber
            {...props}
            value={valueRange[0]}
            onBlur={handleBlurFrom}
            type={type}
            placeHolder={placeHolderRange[0]}
            isSmall={isSmall}
          />
        </div>

        <div className="input-range__input-number-to">
          <InputNumber
            {...props}
            label={""}
            value={valueRange[1]}
            onBlur={handleBlurTo}
            type={type}
            isSmall={isSmall}
            placeHolder={placeHolderRange[1]}
          />
        </div>
      </div>
    </>
  );
}

InputRange.defaultProps = {
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  maxLength: 0,
};

export default InputRange;
