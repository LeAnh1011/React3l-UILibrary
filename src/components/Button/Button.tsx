import classNames from "classnames";
import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import "./Button.scss";

export type ButtonType =
  | "default"
  | "primary"
  | "outline-primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "warning"
  | "link";

export interface ButtonProps {
  type?: ButtonType;

  htmlType?: ButtonHTMLAttributes<any>["type"];

  outlined?: boolean;

  className?: string;

  onClick?: ButtonHTMLAttributes<any>["onClick"];

  children?: ReactNode;

  disabled?: boolean;

  icon?: string;
}

const Button = React.forwardRef(
  (props: PropsWithChildren<ButtonProps>, ref: React.Ref<any>) => {
    const {
      htmlType,
      children,
      type,
      onClick,
      className,
      disabled,
      icon,
    } = props;

    return icon ? (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-have-icon",
          `btn--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <div className="button-content-have-icon">
          <div className="children-content">{children}</div>
          <div className="box-icon">
            <i className={classNames(icon, "icon-button")}></i>
          </div>
        </div>
      </button>
    ) : (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-no-icon",
          `btn--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.defaultProps = {
  type: "default",
  outlined: false,
  htmlType: "button",
  disabled: false,
};

export default Button;
