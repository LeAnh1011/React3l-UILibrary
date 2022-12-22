import classNames from "classnames";
import { ButtonProps } from "../Button";
import React, { PropsWithChildren } from "react";
import "./IconButton.scss";

export interface IconButtonProps extends ButtonProps {}

const IconButton = (
  props: PropsWithChildren<IconButtonProps>,
  ref: React.Ref<any>
) => {
  const { htmlType, type, onClick, className, icon, disabled, ...rest } = props;
  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "btn-component btn-only-icon",
        `btn--${type}`,
        disabled ? "disabled" : "",
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default IconButton;
