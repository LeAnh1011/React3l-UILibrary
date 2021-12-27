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
    } = props;

    const [loadingStatus, setLoadingStatus] = React.useState<boolean>(false);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    React.useEffect(() => {
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
    }, [isFocused, loading]);

    return icon ? (
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
    ) : (
      <>
        {isFocused && (
          <InlineLoading status={loadingStatus ? "finished" : "active"} />
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
