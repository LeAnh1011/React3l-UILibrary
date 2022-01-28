import classNames from "classnames";
import IconLoading from "components/IconLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./BleedButton.scss";

export interface BleedButtonProps extends ButtonProps {}
const BleedButton = React.forwardRef(
  (props: PropsWithChildren<BleedButtonProps>, ref: React.Ref<any>) => {
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
      <>
        <button
          type={htmlType}
          onClick={!loading ? onClick : () => undefined}
          ref={ref}
          disabled={disabled}
          className={classNames(
            "button btn-bleed",
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
      </>
    );
  }
);

export default BleedButton;
