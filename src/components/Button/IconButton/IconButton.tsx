import classNames from "classnames";
import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./IconButton.scss";

export type IconButtonType =
  | "primary"
  | "outline-primary"
  | "danger"
  | "outline-danger"
  | "ghost";

export interface IconButtonProps {
  type?: IconButtonType;

  htmlType?: ButtonHTMLAttributes<any>["type"];

  outlined?: boolean;

  className?: string;

  onClick?: ButtonHTMLAttributes<any>["onClick"];

  icon: string;

  disabled?: boolean;
}

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
          `btn--icon--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <i className={classNames("content-icon", icon)}></i>
      </button>
    );
  }
);

IconButton.defaultProps = {
  type: "primary",
  outlined: false,
  htmlType: "button",
  disabled: false,
};

export default IconButton;
