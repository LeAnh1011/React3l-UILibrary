import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button";
import InlineLoading from "../InlineLoading";
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

    const [loadingStatus, setLoadingStatus] = React.useState<boolean>(false);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    React.useEffect(() => {
      if (isSubmitBtn) {
        if (loading) {
          setIsFocused(true);
        }
        if (isFocused && !loading) {
          setLoadingStatus(true);
          setTimeout(() => {
            setIsFocused(false);
            setLoadingStatus(false);
          }, 1000);
        }
      }
    }, [isFocused, isSubmitBtn, loading]);

    return icon ? (
      <>
        {isSubmitBtn && isFocused && (
          <InlineLoading
            status={loadingStatus ? "finished" : "active"}
            className={classNames("inline-loading-normal-have-icon", className)}
          />
        )}
        {!isFocused && (
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
        {isSubmitBtn && isFocused && (
          <InlineLoading
            status={loadingStatus ? "finished" : "active"}
            className={classNames("inline-loading-normal-no-icon", className)}
          />
        )}
        {!isFocused && (
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
