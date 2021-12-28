import classNames from "classnames";
import InlineLoading from "components/InlineLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps, LoadingStatus } from "../Button";
import "./OutlineButton.scss";
export interface OutlineButtonProps extends ButtonProps {}

const OutlineButton = React.forwardRef(
  (props: PropsWithChildren<OutlineButtonProps>, ref: React.Ref<any>) => {
    const {
      type,
      htmlType,
      onClick,
      className,
      icon,
      disabled,
      children,
      loading,
      isSubmitBtn,
    } = props;

    const [loadingStatus, setLoadingStatus] = React.useState<LoadingStatus>(
      "default"
    );
    React.useEffect(() => {
      if (isSubmitBtn) {
        if (loading) {
          setLoadingStatus("submitting");
        }
        if (loadingStatus === "submitting" && !loading) {
          setLoadingStatus("submitted");
          setTimeout(() => {
            setLoadingStatus("default");
          }, 1000);
        }
      }
    }, [isSubmitBtn, loading, loadingStatus]);
    return icon ? (
      <>
        {isSubmitBtn && loadingStatus !== "default" && (
          <InlineLoading
            status={loadingStatus}
            className={classNames(
              "inline-loading-outline-have-icon",
              className
            )}
          />
        )}
        {loadingStatus === "default" && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-outline-have-icon",
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
      </>
    ) : (
      <>
        {isSubmitBtn && loadingStatus !== "default" && (
          <InlineLoading
            status={loadingStatus}
            className={classNames("inline-loading-outline-no-icon", className)}
          />
        )}
        {loadingStatus === "default" && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-outline-no-icon",
              `btn--${type}`,
              disabled ? "disabled" : "",
              className
            )}
          >
            {children}
          </button>
        )}
      </>
    );
  }
);

export default OutlineButton;
