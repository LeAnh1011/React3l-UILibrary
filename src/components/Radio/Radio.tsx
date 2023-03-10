import { Radio as RadioAntd, RadioGroupProps, RadioProps } from "antd";
import React from "react";
import "./Radio.scss";
import RadioGroup from "./RadioGroup";

export interface RadioComponentProps {
  onChange?: (value: boolean) => void;

  checked?: boolean;
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
