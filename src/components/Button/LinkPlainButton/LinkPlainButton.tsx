import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./LinkPlainButton.scss";

export interface LinkPlainButtonProps extends ButtonProps {}

const LinkPlainButton = React.forwardRef(
  (props: PropsWithChildren<LinkPlainButtonProps>, ref: React.Ref<any>) => {
    const { type, htmlType, onClick, className, disabled, children } = props;

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
        <div>{children}</div>
      </button>
    );
  }
);

export default LinkPlainButton;
