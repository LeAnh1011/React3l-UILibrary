import classNames from "classnames";
import InlineLoading from "components/InlineLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps, LoadingStatus } from "../Button";
import "./NormalButton.scss";

export interface NormalButtonProps extends ButtonProps {}

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
            className={classNames("inline-loading-normal-have-icon", className)}
          />
        )}
        {loadingStatus === "default" && (
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
      </>
    ) : (
      <>
        {isSubmitBtn && loadingStatus !== "default" && (
          <InlineLoading
            status={loadingStatus}
            className={classNames("inline-loading-normal-no-icon", className)}
          />
        )}
        {loadingStatus === "default" && (
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
      </>
    );
  }
);

export default NormalButton;
