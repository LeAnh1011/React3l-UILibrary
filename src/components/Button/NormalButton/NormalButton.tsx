import classNames from "classnames";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import "./NormalButton.scss";

export interface NormalButtonProps extends ButtonProps {}
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 15,
      color: "#ffffff",
    }}
    className="spin-loading"
    spin
  />
);
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

    return icon ? (
      <>
        {!loading && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-normal-have-icon",
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
              "btn btn-normal-have-icon no-box-shadow",
              `btn--${type}`,
              className
            )}
          >
            <div className="button-content-have-icon">
              <div className="children-content">{children}</div>
              <div className="box-icon">
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
              "btn btn-normal-no-icon",
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
              "btn btn-normal-have-icon no-box-shadow",
              `btn--${type}`,
              className
            )}
          >
            <div className="button-content-have-icon">
              <div className="children-content">{children}</div>
              <div className="box-icon">
                <Spin indicator={antIcon} />
              </div>
            </div>
          </button>
        )}
      </>
    );
  }
);

export default NormalButton;
