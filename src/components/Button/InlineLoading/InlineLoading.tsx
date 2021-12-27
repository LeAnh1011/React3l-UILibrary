import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export interface InlineLoadingProps {
  className?: string;
  status?: "active" | "finished";
  type?: string;
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
    const { className, status, type } = props;

    return (
      <div className={classNames("btn", `btn--${type}`, className)}>
        {status === "active" && (
          <>
            <Spin indicator={antIcon} /> Loading...
          </>
        )}
        {status === "finished" && <>loaded</>}
      </div>
    );
  }
);

InlineLoading.defaultProps = {
  status: "active",
};

export default InlineLoading;
