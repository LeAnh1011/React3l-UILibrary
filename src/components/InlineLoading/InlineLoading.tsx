import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { CheckmarkFilled16, ErrorFilled16 } from "@carbon/icons-react";

export interface InlineLoadingProps {
  className?: string;
  status?: "default" | "submitting" | "submitted" | "error";
}

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 16, marginRight: 8 }}
    className="spin-loading"
    spin
  />
);

const InlineLoading = React.forwardRef(
  (props: PropsWithChildren<InlineLoadingProps>, ref: React.Ref<any>) => {
    const { className, status } = props;

    return (
      <div className={classNames("inline-loading", className)}>
        {status === "submitting" && (
          <>
            <Spin indicator={antIcon} />
            Loading...
          </>
        )}
        {status === "submitted" && (
          <div className="submitted-box">
            <CheckmarkFilled16 className="icon-submitted-inline-loading" />
            Submitted
          </div>
        )}
        {status === "error" && (
          <div className="submitted-box">
            <ErrorFilled16 className="icon-error-inline-loading" />
            Error
          </div>
        )}
      </div>
    );
  }
);

InlineLoading.defaultProps = {
  status: "submitting",
};

export default InlineLoading;
