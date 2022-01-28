import classNames from "classnames";
import IconLoading from "components/IconLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./NormalButton.scss";

export interface NormalButtonProps extends ButtonProps {}
const NormalButton = React.forwardRef(
  (props: PropsWithChildren<NormalButtonProps>, ref: React.Ref<any>) => {
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
          "button",
          icon ? "btn-normal-have-icon" : "btn-normal-no-icon",
          !loading ? `btn--${type}` : `btn--${type}-loading`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <div className="button-content">
          <div className="children-content">{children}</div>
          <div className="box-icon">{loading ? <IconLoading /> : icon}</div>
        </div>
      </button>
    );
  }
);

export default NormalButton;
