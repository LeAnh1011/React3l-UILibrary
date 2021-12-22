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
  | "ghost-primary"
  | "ghost-secondary"
  | "danger"
  | "outline-danger"
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
    let numb = 0;
    switch (type) {
      // ba bộ đầu có bộ padding khá giống nhau
      // khác nhau mỗi padding khi có icon hoặc không có icon
      // nên đặt là btn-normal-have/no-icon cho 2 bộ này
      // và sẽ chia thành case 1 và 2 cho numb
      case "primary":
        if (!icon) {
          numb = 1;
          break;
        } else {
          numb = 2;
          break;
        }
      case "outline-primary":
        if (!icon) {
          numb = 1;
          break;
        } else {
          numb = 2;
          break;
        }
      case "secondary":
        if (!icon) {
          numb = 1;
          break;
        } else {
          numb = 2;
          break;
        }
      case "ghost": //các bộ ghost có ui padding khác nên chia thành 3-4
        if (!icon) {
          numb = 3;
          break;
        } else {
          numb = 4;
          break;
        }
      case "ghost-primary":
        if (!icon) {
          numb = 3;
          break;
        } else {
          numb = 4;
          break;
        }
      case "ghost-secondary":
        if (!icon) {
          numb = 3;
          break;
        } else {
          numb = 4;
          break;
        }
      case "danger": // bộ danger có ui padding khá giống 3 bộ đầu nên chia 1 và 2
        if (!icon) {
          numb = 1;
          break;
        } else {
          numb = 2;
          break;
        }
      case "outline-danger":
        if (!icon) {
          numb = 1;
          break;
        } else {
          numb = 2;
          break;
        }
      default:
        numb = 1;
    }

    return numb === 1 ? (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-normal-no-icon",
          `btn--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        {children}
      </button>
    ) : numb === 2 ? (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-normal-have-icon",
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
    ) : numb === 3 ? (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-ghost-no-icon",
          `btn--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        {children}
      </button>
    ) : (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-ghost-have-icon",
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
