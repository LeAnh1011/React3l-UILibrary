import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./LinkButton.scss";

export interface LinkButtonProps extends ButtonProps {}

const LinkButton = (props: PropsWithChildren<LinkButtonProps>) => {
  const {
    type,
    htmlType,
    onClick,
    className,
    disabled,
    children,
    ...rest
  } = props;

  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "btn-component",
        `btn--${type}`,
        disabled ? "disabled" : "",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default LinkButton;
