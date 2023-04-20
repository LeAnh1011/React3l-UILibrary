import { Radio as RadioAntd, RadioGroupProps, RadioProps } from "antd";
import React from "react";
import RadioGroup from "./RadioGroup";
import "./Radio.scss";

export interface RadioComponentProps {
  /**Handle the change value */
  onChange?: (value: boolean) => void;
  /**Specifies whether the radio is selected */
  checked?: boolean;
  /**Not allow change value */
  disabled?: boolean;
}

function Radio(props: RadioComponentProps & RadioProps & RadioGroupProps) {
  const { onChange, checked, disabled, children } = props;
  const handleChange = React.useCallback(
    (value) => {
      if (onChange && typeof onChange === "function") {
        return onChange(value.target.checked);
      }
      return;
    },
    [onChange]
  );

  return (
    <div className="radio__container">
      <RadioAntd
        {...props}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      >
        {children}
      </RadioAntd>
    </div>
  );
}

Radio.Group = RadioGroup;

export default Radio;
