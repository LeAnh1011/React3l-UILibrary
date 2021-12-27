import classNames from "classnames";
import { ButtonProps } from "../Button";
import React, { PropsWithChildren } from "react";
import "./IconButton.scss";

export interface IconButtonProps extends ButtonProps {}

const IconButton = React.forwardRef(
  (props: PropsWithChildren<IconButtonProps>, ref: React.Ref<any>) => {
    const { htmlType, type, onClick, className, icon, disabled } = props;

    return (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-only-icon",
          `btn--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <i className={classNames("content-icon", icon)}></i>
      </button>
    );
  }
);

export default IconButton;
