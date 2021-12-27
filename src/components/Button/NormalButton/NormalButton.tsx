import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import InlineLoading from "../InlineLoading";
import "./NormalButton.scss";
export type LoadingType = "default" | "submitting" | "submitted";
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

    const [loadingType, setLoadingType] = React.useState<LoadingType>(
      "default"
    );

    React.useEffect(() => {
      if (isSubmitBtn) {
        if (loading) {
          setLoadingType("submitting");
        }
        if (loadingType === "submitting" && !loading) {
          setLoadingType("submitted");
          setTimeout(() => {
            setLoadingType("default");
          }, 15000);
        }
      }
    }, [isSubmitBtn, loading, loadingType]);

    return icon ? (
      <>
        {isSubmitBtn && loadingType !== "default" && (
          <InlineLoading
            status={loadingType}
            className={classNames("inline-loading-normal-have-icon", className)}
          />
        )}
        {loadingType === "default" && (
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
              <div className="box-icon">
                <i className={classNames(icon, "icon-button")}></i>
              </div>
            </div>
          </button>
        )}
      </>
    ) : (
      <>
        {isSubmitBtn && loadingType !== "default" && (
          <InlineLoading
            status={loadingType}
            className={classNames("inline-loading-normal-no-icon", className)}
          />
        )}
        {loadingType === "default" && (
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
