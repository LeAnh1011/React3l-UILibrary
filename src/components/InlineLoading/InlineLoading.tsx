import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./InlineLoading.scss";
import { CheckmarkFilled16, ErrorFilled16 } from "@carbon/icons-react";
import IconLoading from "components/IconLoading";
import { TFunction } from "i18next";

export interface InlineLoadingProps {
  className?: string;
  status?: "default" | "submitting" | "submitted" | "error";
  keyTranslate?: string;
  translate?: TFunction;
}

const InlineLoading = React.forwardRef(
  (props: PropsWithChildren<InlineLoadingProps>, ref: React.Ref<any>) => {
    const { className, status, keyTranslate, translate } = props;

    return (
      <div className={classNames("inline-loading", className)}>
        {status === "submitting" && (
          <div className="submitting-box">
            <IconLoading color="#0F62FE" />
            <div className="p-l--xxs">
              {keyTranslate && translate
                ? translate(`${keyTranslate}.loading`)
                : "Loading..."}
            </div>
          </div>
        )}
        {status === "submitted" && (
          <div className="submitted-box">
            <CheckmarkFilled16 className="icon-submitted-inline-loading" />
            {keyTranslate && translate
              ? translate(`${keyTranslate}.submitted`)
              : "Submitted"}
          </div>
        )}
        {status === "error" && (
          <div className="error-box">
            <ErrorFilled16 className="icon-error-inline-loading" />
            {keyTranslate && translate
              ? translate(`${keyTranslate}.error`)
              : "Error"}
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
