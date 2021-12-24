import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./GhostButton.scss";

export interface GhostButtonProps extends ButtonProps {}

const GhostButton = React.forwardRef(
  (props: PropsWithChildren<GhostButtonProps>, ref: React.Ref<any>) => {
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
    ) : (
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
  }
);

GhostButton.defaultProps = {
  type: "primary",
  outlined: false,
  htmlType: "button",
  disabled: false,
};

export default GhostButton;
