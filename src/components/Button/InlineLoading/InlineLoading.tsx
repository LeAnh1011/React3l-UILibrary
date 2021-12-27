import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import doneImg from "../../../assets/image/done.png";

export interface InlineLoadingProps {
  className?: string;
  status?: "active" | "finished";
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
      <div className={classNames("btn", className)}>
        {status === "active" && (
          <>
            <Spin indicator={antIcon} /> Submitting...
          </>
        )}
        {status === "finished" && (
          <>
            {" "}
            <img src={doneImg} alt="done" className="img-done-inline-loading" />
            Submitted
          </>
        )}
      </div>
    );
  }
);

InlineLoading.defaultProps = {
  status: "active",
};

export default InlineLoading;
