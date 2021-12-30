import classNames from "classnames";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./OutlineButton.scss";
export interface OutlineButtonProps extends ButtonProps {}
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
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={classNames(
          "btn btn-outline-have-icon",
          icon ? "btn-outline-have-icon" : "btn-outline-no-icon",
          !loading ? `btn--${type}` : `btn--${type}-loading`,
          disabled ? "disabled" : "",
          className
        )}
      >
        <div className="button-content-have-icon">
          <div className="children-content">{children}</div>
          <div className="box-icon">
            {loading ? <Spin indicator={antIcon} /> : icon}
          </div>
        </div>
      </button>
    );
  }
);

export default OutlineButton;
