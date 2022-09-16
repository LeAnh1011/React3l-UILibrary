import InputNumber, { InputNumberProps } from "components/Input/InputNumber/InputNumber";
import { BORDER_TYPE } from "config/enum";
import React from "react";
import "./AdvanceInputRangeFilter.scss";

export interface InputRangeProps extends InputNumberProps{
  valueRange: [number, number] | [];
  placeHolderRange?: [string, string];
  type?: BORDER_TYPE;
  onChangeRange: (T: [number, number]) => void;
  isSmall?: boolean;
}

function AdvanceInputRangeFilter(props: InputRangeProps) {
  const { 
    valueRange,
    type = 0, 
    placeHolderRange = [null, null], 
    onChangeRange,
    isSmall
  } = props;

  const validateRange = React.useCallback((fromValue, toValue) => {
    if (typeof fromValue === 'undefined' || typeof toValue === 'undefined') return true;
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
    [onChangeRange, validateRange, valueRange],
  );
  

  const handleBlurTo = React.useCallback(
    (number: number) => {
      if (validateRange(valueRange[0], number)) {
        onChangeRange([valueRange[0], number]);
      } else {
        onChangeRange([undefined, undefined]);
      }
    },
    [onChangeRange, validateRange, valueRange],
  );

  return (
    <>
      <div className='input-range__container'>
        <div className='input-range__input-number m-r--xxs'>
          <InputNumber
            {...props}
            value={valueRange[0]}
            onBlur={handleBlurFrom}
            type={type}
            placeHolder={placeHolderRange[0]}
            isSmall={isSmall}
          />
        </div>
      
        <div className='input-range__input-number-to'>
          <InputNumber
            {...props}
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

AdvanceInputRangeFilter
.defaultProps = {
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  prefix: "",
  disabled: false,
  className: "",
  maxLength: 0,
};

export default AdvanceInputRangeFilter;
