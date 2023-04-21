import { Radio as RadioAntd, RadioGroupProps } from "antd";
import React from "react";
import "./Radio.scss";

export interface RadioGroupComponentProps {
  /**Handle change item checked */
  onChecked?: (value: boolean) => void;
  /**Value of item checked */
  value?: any;
  /**Not allow to change value RadioGroup */
  disabled?: boolean;
}

function RadioGroup(props: RadioGroupComponentProps & RadioGroupProps) {
  const { onChecked, value, disabled, children } = props;
  const handleChange = React.useCallback(
    (value) => {
      if (onChecked && typeof onChecked === "function") {
        return onChecked(value.target.value);
      }
      return;
    },
    [onChecked]
  );

  return (
    <div className="checkbox__container">
      <RadioAntd.Group
        {...props}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        {children}
      </RadioAntd.Group>
    </div>
  );
}

export default RadioGroup;
