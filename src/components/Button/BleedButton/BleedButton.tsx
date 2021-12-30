import classNames from "classnames";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./BleedButton.scss";

export interface BleedButtonProps extends ButtonProps {}
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "#ffffff",
    }}
    className="spin-loading"
    spin
  />
);
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
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className={classNames(
            "btn btn-bleed",
            !loading ? `btn--${type}` : `btn--${type}-loading`,
            disabled ? "disabled" : "",
            className
          )}
        >
          <div className="button-content">
            <div className="children-content">{children}</div>
            <div className="box-icon">
              {loading ? <Spin indicator={antIcon} /> : icon}
            </div>
          </div>
        </button>
      </>
    );
  }
);

export default BleedButton;
