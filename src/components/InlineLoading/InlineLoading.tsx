import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import { CheckmarkFilled16, ErrorFilled16 } from "@carbon/icons-react";
import IconLoading from "components/IconLoading";

export interface InlineLoadingProps {
  className?: string;
  status?: "default" | "submitting" | "submitted" | "error";
  keyTranslate?: [string, string, string];
}

const InlineLoading = React.forwardRef(
  (props: PropsWithChildren<InlineLoadingProps>, ref: React.Ref<any>) => {
    const { className, status, keyTranslate } = props;

    return (
      <div className={classNames("inline-loading", className)}>
        {status === "submitting" && (
          <div className="submitting-box">
            <IconLoading color="#0F62FE" />
            <div className="p-l--xxs">{keyTranslate[0]}</div>
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
