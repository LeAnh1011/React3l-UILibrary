import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./LinkButton.scss";

export interface LinkButtonProps extends ButtonProps {}

const LinkButton = React.forwardRef(
  (props: PropsWithChildren<LinkButtonProps>, ref: React.Ref<any>) => {
    const { type, htmlType, onClick, className, disabled, children } = props;

    return (
      <button
        type={htmlType}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn-component btn-link",
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

export default LinkButton;
