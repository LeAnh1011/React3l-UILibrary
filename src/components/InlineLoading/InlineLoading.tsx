import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import CheckmarkFilled16 from "@carbon/icons-react/es/checkmark--filled/16";
import ErrorFilled16 from "@carbon/icons-react/es/error--filled/16";
import IconLoading from "@Components/IconLoading";

export interface InlineLoadingProps {
  className?: string;
  status?: "default" | "submitting" | "submitted" | "error";
  titleLoading?: string;
  titleSubmitted?: string;
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
            <div className="p-l--xxs">{titleLoading}</div>
          </div>
        )}
        {status === "submitted" && (
          <div className="submitted-box">
            <CheckmarkFilled16 className="icon-submitted-inline-loading" />
            {titleSubmitted}
          </div>
        )}
        {status === "error" && (
          <div className="error-box">
            <ErrorFilled16 className="icon-error-inline-loading" />
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
