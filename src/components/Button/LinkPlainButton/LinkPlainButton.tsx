import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./LinkPlainButton.scss";

export interface LinkPlainButtonProps extends ButtonProps {}

const LinkPlainButton = (props: PropsWithChildren<LinkPlainButtonProps>) => {
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
        "btn-component btn-link-plain",
        `btn--${type}`,
        disabled ? "disabled" : "",
        className
      )}
      {...rest}
    >
      <div>{children}</div>
    </button>
  );
};

export default LinkPlainButton;
