import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./BleedButton.scss";

export interface BleedButtonProps extends ButtonProps {}

const BleedButton = React.forwardRef(
  (props: PropsWithChildren<BleedButtonProps>, ref: React.Ref<any>) => {
    const {
      type,
      htmlType,
      onClick,
      className,
      icon,
      disabled,
      children,
    } = props;

    return icon ? (
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
    ) : (
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
  }
);

export default BleedButton;
