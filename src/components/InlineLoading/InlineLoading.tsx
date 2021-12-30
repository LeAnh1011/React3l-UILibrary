import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { CheckmarkFilled16, ErrorFilled16 } from "@carbon/icons-react";

export interface InlineLoadingProps {
  className?: string;
  status?: "default" | "submitting" | "submitted" | "error";
  keyTranslate?: [string, string, string];
}

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 16, marginRight: 8, color: "#0F62FE" }}
    className="spin-loading"
    spin
  />
);

const InlineLoading = React.forwardRef(
  (props: PropsWithChildren<InlineLoadingProps>, ref: React.Ref<any>) => {
    const { className, status, keyTranslate } = props;

    return (
      <div className={classNames("inline-loading", className)}>
        {status === "submitting" && (
          <div className="submitting-box">
            <Spin indicator={antIcon} />
            {keyTranslate[0]}
          </div>
        )}
        {status === "submitted" && (
          <div className="submitted-box">
            <CheckmarkFilled16 className="icon-submitted-inline-loading" />
            {keyTranslate[1]}
          </div>
        )}
        {status === "error" && (
          <div className="error-box">
            <ErrorFilled16 className="icon-error-inline-loading" />
            {keyTranslate[2]}
          </div>
        )}
      </div>
    );
  }
);

InlineLoading.defaultProps = {
  status: "submitting",
  keyTranslate: ["loading...", "submitted", "error"],
};

export default InlineLoading;
