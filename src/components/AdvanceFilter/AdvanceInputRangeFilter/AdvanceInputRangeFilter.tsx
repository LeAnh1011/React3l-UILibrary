import InputNumber, {
  InputNumberProps,
} from "@Components/Input/InputNumber/InputNumber";
import { BORDER_TYPE } from "@Configs/enum";
import React from "react";
import "./AdvanceInputRangeFilter.scss";

export interface AdvanceInputRangeFilterProps extends InputNumberProps {
  /**[filterValueFrom, filterValueTo] of filter*/
  valueRange: [number, number] | [];
  /**Placeholder of the component*/
  placeHolderRange?: [string, string];
  /**Control the style type of component: MATERIAL, BORDERED, FLOAT_LABEL */
  type?: BORDER_TYPE;
  /**Handle the change values of the component*/
  onChangeRange: (T: [number, number]) => void;
  /**Control the size of the component*/
  isSmall?: boolean;
  /** Custom background color for component: "white" || "gray" */
  bgColor?: "white" | "gray";
}

function AdvanceInputRangeFilter(props: AdvanceInputRangeFilterProps) {
  const {
    valueRange,
    type = 0,
    placeHolderRange = [null, null],
    onChangeRange,
    isSmall,
    bgColor,
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
        onChangeRange([number, undefined]);
      }
    },
    [onChangeRange, validateRange, valueRange]
  );

  const handleBlurTo = React.useCallback(
    (number: number) => {
      if (validateRange(valueRange[0], number)) {
        onChangeRange([valueRange[0], number]);
      } else {
        onChangeRange([undefined, number]);
      }
    },
    [onChangeRange, validateRange, valueRange]
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
            bgColor={bgColor}
          />
        </div>

        <div className="input-range__input-number-to">
          <InputNumber
            {...props}
            value={valueRange[1]}
            onBlur={handleBlurTo}
            type={type}
            isSmall={isSmall}
            placeHolder={placeHolderRange[1]}
            bgColor={bgColor}
          />
        </div>
      </div>
    </>
  );
}

AdvanceInputRangeFilter.defaultProps = {
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  prefix: "",
  disabled: false,
  className: "",
  maxLength: 0,
  bgColor: "white",
};

export default AdvanceInputRangeFilter;
