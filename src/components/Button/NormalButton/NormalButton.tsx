import classNames from "classnames";
import IconLoading from "@Components/IconLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./NormalButton.scss";

export interface NormalButtonProps extends ButtonProps {}
const NormalButton = (props: PropsWithChildren<NormalButtonProps>) => {
  const {
    type,
    htmlType,
    onClick,
    className,
    icon,
    disabled,
    children,
    loading,
    ...rest
  } = props;

  return (
    <button
      type={htmlType}
      onClick={!loading ? onClick : () => undefined}
      disabled={disabled}
      className={classNames(
        "btn-component",
        icon ? "btn-normal-have-icon" : "btn-normal-no-icon",
        !loading ? `btn--${type}` : `btn--${type}-loading`,
        disabled ? "disabled" : "",
        className
      )}
      {...rest}
    >
      <div className="button-content">
        <div className="children-content">{children}</div>
        <div className="box-icon">{loading ? <IconLoading /> : icon}</div>
      </div>
    </button>
  );
};

export default NormalButton;
