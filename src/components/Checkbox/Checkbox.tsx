import React from "react";
import { Checkbox as CheckboxAntd } from "antd";
import CheckboxGroup from "./CheckboxGroup";
import classNames from "classnames";
import "./Checkbox.scss";

export interface CheckboxProps {
  /**Handle change value checkbox */
  onChange?: (value: boolean) => void;
  /**Specifies whether the checkbox is selected */
  checked?: boolean;
  /**True to not allow change value */
  disabled?: boolean;
  /**Label of this checkbox item */
  label?: string;
  /**Type read only is true */
  readOnly?: boolean;
}

function Checkbox(props: CheckboxProps) {
  const { onChange, checked, disabled, label, readOnly } = props;
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
    <div
      className={classNames("checkbox__container", {
        "read-only": readOnly,
      })}
    >
      <CheckboxAntd
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      >
        {label}
      </CheckboxAntd>
    </div>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
