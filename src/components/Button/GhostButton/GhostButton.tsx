import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { ButtonProps } from "../Button";
import "./GhostButton.scss";

export interface GhostButtonProps extends ButtonProps {}

const GhostButton = (props: PropsWithChildren<GhostButtonProps>) => {
  const {
    type,
    htmlType,
    className,
    icon,
    disabled,
    children,
    onClick,
    loading,
    ...rest
  } = props;

  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "btn-component",
        icon ? "btn-ghost-have-icon" : "btn-ghost-no-icon",
        `btn--${type}`,
        disabled ? "disabled" : "",
        className
      )}
      {...rest}
    >
      <div className="button-content">
        <div className="children-content">{children}</div>
        {icon && <div className="box-icon">{icon}</div>}
      </div>
    </button>
  );
};

export default GhostButton;
