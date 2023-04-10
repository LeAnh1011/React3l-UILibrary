import classNames from "classnames";
import IconLoading from "@Components/IconLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./OutlineButton.scss";

export interface OutlineButtonProps extends ButtonProps { }

const OutlineButton = React.forwardRef(
  (props: PropsWithChildren<OutlineButtonProps>, ref: React.Ref<any>) => {
    const {
      type,
      htmlType,
      onClick,
      className,
      icon,
      disabled,
      children,
      loading,
    } = props;

    return (
      <button
        type={htmlType}
        onClick={!loading ? onClick : () => undefined}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn-component btn-outline-have-icon",
          icon ? "btn-outline-have-icon" : "btn-outline-no-icon",
          !loading ? `btn--${type}` : `btn--${type}-loading`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <div className="button-content-have-icon">
          <div className="children-content">{children}</div>
          <div className="box-icon">{loading ? <IconLoading /> : icon}</div>
        </div>
      </button>
    );
  }
);

export default OutlineButton;
