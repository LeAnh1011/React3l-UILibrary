import classNames from "classnames";
import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import "./Button.scss";

export type ButtonType =
  | "primary"
  | "outline-primary"
  | "secondary"
  | "ghost"
  | "ghost-primary"
  | "ghost-secondary"
  | "danger"
  | "outline-danger"
  | "bleed-primary"
  | "bleed-secondary"
  | "link-plain"
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
      case "bleed-primary": // bộ bleed có ui padding cố định, khác bộ khác chia thành 5-6
        if (!icon) {
          numb = 5;
          break;
        } else {
          numb = 6;
          break;
        }
      case "bleed-secondary":
        if (!icon) {
          numb = 5;
          break;
        } else {
          numb = 6;
          break;
        }
      case "link-plain": // bộ link-plain & link có ui padding cố định, khác bộ khác chia thành 7-8
        numb = 7;
        break;
      case "link":
        numb = 8;
        break;
      default:
        numb = 1;
    }

    const Button1 = React.useMemo(() => {
      return (
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
      );
    }, [children, className, disabled, htmlType, onClick, ref, type]);

    const Button2 = React.useMemo(() => {
      return (
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
      );
    }, [children, className, disabled, htmlType, icon, onClick, ref, type]);

    const Button3 = React.useMemo(() => {
      return (
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
      );
    }, [children, className, disabled, htmlType, onClick, ref, type]);

    const Button4 = React.useMemo(() => {
      return (
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
    }, [children, className, disabled, htmlType, icon, onClick, ref, type]);

    const Button5 = React.useMemo(() => {
      return (
        <button
          type={htmlType}
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className={classNames(
            "btn btn-bleed-no-icon",
            `btn--${type}`,
            disabled ? "disabled" : "",
            className
          )}
        >
          {children}
        </button>
      );
    }, [children, className, disabled, htmlType, onClick, ref, type]);

    const Button6 = React.useMemo(() => {
      return (
        <button
          type={htmlType}
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className={classNames(
            "btn btn-bleed-have-icon",
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
    }, [children, className, disabled, htmlType, icon, onClick, ref, type]);

    const Button7 = React.useMemo(() => {
      return (
        <button
          type={htmlType}
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className={classNames(
            "btn btn-link-plain",
            `btn--${type}`,
            disabled ? "disabled" : "",
            className
          )}
        >
          {children}
        </button>
      );
    }, [children, className, disabled, htmlType, onClick, ref, type]);

    const Button8 = React.useMemo(() => {
      return (
        <button
          type={htmlType}
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className={classNames(
            "btn btn-link-plain",
            `btn--${type}`,
            disabled ? "disabled" : "",
            className
          )}
        >
          {children}
        </button>
      );
    }, [children, className, disabled, htmlType, onClick, ref, type]);

    // render button here
    return numb === 1
      ? Button1
      : numb === 2
      ? Button2
      : numb === 3
      ? Button3
      : numb === 4
      ? Button4
      : numb === 5
      ? Button5
      : numb === 6
      ? Button6
      : numb === 7
      ? Button7
      : Button8;
  }
);

Button.defaultProps = {
  type: "primary",
  outlined: false,
  htmlType: "button",
  disabled: false,
};

export default Button;
