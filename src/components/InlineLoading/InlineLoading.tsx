import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { CheckmarkFilled, ErrorFilled } from "@carbon/icons-react";
import IconLoading from "@Components/IconLoading";
import "./InlineLoading.scss";

export type StatusLoading = "default" | "submitting" | "submitted" | "error";
export interface InlineLoadingProps {
  /**Pass the classname to change the style inline loading */
  className?: string;
  /**State of inline loading*/
  status?: "default" | "submitting" | "submitted" | "error";
  /**Title for status submitting*/
  titleLoading?: string;
  /**Title for status submitted*/
  titleSubmitted?: string;
  /**Title for status error*/
  titleError?: string;
}

const InlineLoading = React.forwardRef(
  (props: PropsWithChildren<InlineLoadingProps>, ref: React.Ref<any>) => {
    const {
      className,
      status,
      titleLoading,
      titleSubmitted,
      titleError,
    } = props;

    return (
      <div className={classNames("inline-loading", className)}>
        {status === "submitting" && (
          <div className="submitting-box">
            <IconLoading color="#0F62FE" />
            <div className="p-l--2xs">{titleLoading}</div>
          </div>
        )}
        {status === "submitted" && (
          <div className="submitted-box">
            <CheckmarkFilled
              size={16}
              className="icon-submitted-inline-loading"
            />
            {titleSubmitted}
          </div>
        )}
        {status === "error" && (
          <div className="error-box">
            <ErrorFilled size={16} className="icon-error-inline-loading" />
            {titleError}
          </div>
        )}
      </div>
    );
  }
);

InlineLoading.defaultProps = {
  status: "submitting",
  titleLoading: "Loading...",
  titleSubmitted: "Submitted",
  titleError: "Error",
};

export default InlineLoading;
