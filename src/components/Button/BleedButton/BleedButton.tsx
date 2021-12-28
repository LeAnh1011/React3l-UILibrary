import classNames from "classnames";
import InlineLoading from "components/InlineLoading";
import React, { PropsWithChildren } from "react";
import { ButtonProps, LoadingStatus } from "../Button";
import "./BleedButton.scss";

export interface BleedButtonProps extends ButtonProps {}

const BleedButton = React.forwardRef(
  (props: PropsWithChildren<BleedButtonProps>, ref: React.Ref<any>) => {
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
            className={classNames("inline-loading-bleed-have-icon", className)}
          />
        )}
        {loadingStatus === "default" && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-bleed-have-icon",
              `btn--${type}`,
              disabled ? "disabled" : "",
              className
            )}
          >
            <div className="button-content-have-icon">
              <div className="children-content">{children}</div>
              <div className="box-icon">
                <i className={classNames(icon, "icon-button")}></i>
              </div>
            </div>
          </button>
        )}
      </>
    ) : (
      <>
        {isSubmitBtn && loadingStatus !== "default" && (
          <InlineLoading
            status={loadingStatus}
            className={classNames("inline-loading-bleed-no-icon", className)}
          />
        )}
        {loadingStatus === "default" && (
          <button
            type={htmlType}
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className={classNames(
              "btn btn-bleed-no-icon",
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

export default BleedButton;
