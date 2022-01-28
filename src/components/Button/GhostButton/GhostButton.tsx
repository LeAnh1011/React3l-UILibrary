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

    return (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "button",
          icon ? "btn-ghost-have-icon" : "btn-ghost-no-icon",
          `btn--${type}`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <div className="button-content">
          <div className="children-content">{children}</div>
          {icon && <div className="box-icon">{icon}</div>}
        </div>
      </button>
    );
  }
);

export default GhostButton;
