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
  | "secondary"
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
}

const Button = React.forwardRef(
  (props: PropsWithChildren<ButtonProps>, ref: React.Ref<any>) => {
    const { htmlType, children, type, onClick, className } = props;

    return (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        className={classNames("btn", `btn-${type}`, className)}
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
};

export default Button;
