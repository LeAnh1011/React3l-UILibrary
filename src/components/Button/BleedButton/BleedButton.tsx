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

    return icon ? (
      <>
        {!loading && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-bleed-have-icon ",
              `btn--${type}`,
              disabled ? "disabled" : "",
              className
            )}
          >
            <div className="button-content-have-icon">
              <div className="children-content">{children}</div>
              <div className="box-icon">{icon}</div>
            </div>
          </button>
        )}
        {/* // button use in loading time */}
        {loading && (
          <button
            className={classNames(
              "btn btn-bleed-have-icon no-box-shadow",
              `btn--${type}`,
              disabled ? "disabled" : "",
              className
            )}
          >
            <div className="button-content-have-icon">
              <div className="children-content">{children}</div>
              <div className="box-icon">
                {" "}
                <Spin indicator={antIcon} />
              </div>
            </div>
          </button>
        )}
      </>
    ) : (
      <>
        {!loading && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-bleed-no-icon",
              `btn--${type}`,
              disabled ? "disabled" : "",
              className
            )}
          >
            {children}
          </button>
        )}
        {/* // button use in loading time */}
        {loading && (
          <button
            className={classNames(
              "btn btn-bleed-have-icon no-box-shadow",
              `btn--${type}`,
              disabled ? "disabled" : "",
              className
            )}
          >
            <div className="button-content-have-icon">
              <div className="children-content">{children}</div>
              <div className="box-icon">
                {" "}
                <Spin indicator={antIcon} />
              </div>
            </div>
          </button>
        )}
      </>
    );
  }
);

export default BleedButton;
