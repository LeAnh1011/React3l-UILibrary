import { Close } from "@carbon/icons-react";
import { Spin } from "antd";
import classNames from "classnames";
import Button from "@Components/Button";
import { NUMBER_BUTTON } from "@Configs/enum";
import React, { ReactNode, RefObject } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./Drawer.scss";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#0f62fe" }} spin />
);

export interface DrawerProps {
  children?: ReactNode;
  /**Control the drawer visible or not*/
  visible?: boolean;
  /**Control the footer of drawer visible or not*/
  visibleFooter?: boolean;
  /**Control the disable state of Apply button and Apply button*/
  disableButton?: boolean;
  /**Control the loading state of the drawer*/
  loading?: boolean;
  /**The title for drawer*/
  title?: ReactNode;
  /**The description for title*/
  description?: ReactNode;
  /**The title of Apply button*/
  titleButtonApply?: string;
  /**The title of ApplyNext button*/
  titleButtonApplyNext?: string;
  /**The title of cancel button*/
  titleButtonCancel?: string;
  /**Control number button of footer drawer*/
  numberButton?: NUMBER_BUTTON;
  /**Function to be called when user click close icon*/
  handleClose?: () => void;
  /**Function to be called when user click cancel button*/
  handleCancel?: () => void;
  /**Function to be called when user click Apply button. After click the drawer will be closed*/
  handleSave?: () => void;
  /**Function to be called when user click submit button ApplyNext*/
  handleApplyNext?: () => void;
  /**Control close icon visible or not*/
  isHaveCloseIcon?: boolean;
  /**Control the size of drawer*/
  size?: "sm" | "lg" | "xl" | "2xl" | "max";
  /**Control the size of drawer*/
  side?: "left" | "right";
  /**Use to custom style the component*/
  className?: string;
}

function Drawer(props: DrawerProps) {
  const {
    visibleFooter,
    visible,
    disableButton,
    loading,
    title,
    description,
    titleButtonApply,
    titleButtonApplyNext,
    titleButtonCancel,
    numberButton,
    handleClose,
    handleCancel,
    handleSave,
    handleApplyNext,
    isHaveCloseIcon,
    size,
    side,
    className,
  } = props;
  const ref: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const renderModalFooter = React.useMemo(
    () => (
      <div className="button-bleed-footer">
        <Button
          type="bleed-secondary"
          className={classNames(
            numberButton === NUMBER_BUTTON.THREE ? "button-33" : "button-50"
          )}
          onClick={handleCancel}
        >
          <span>{titleButtonCancel ? titleButtonCancel : "Cancel"}</span>
        </Button>
        {numberButton === NUMBER_BUTTON.THREE && (
          <Button
            type="bleed-secondary"
            className="button-33"
            onClick={handleApplyNext}
            disabled={disableButton}
          >
            <span>
              {titleButtonApplyNext ? titleButtonApplyNext : "Apply Next"}
            </span>
          </Button>
        )}
        <Button
          type="bleed-primary"
          className={classNames(
            numberButton === NUMBER_BUTTON.THREE ? "button-33" : "button-50"
          )}
          onClick={handleSave}
          disabled={disableButton}
        >
          <span>{titleButtonApply ? titleButtonApply : "Apply"}</span>
        </Button>
      </div>
    ),
    [
      numberButton,
      handleSave,
      disableButton,
      titleButtonApply,
      handleApplyNext,
      titleButtonApplyNext,
      handleCancel,
      titleButtonCancel,
    ]
  );
  return (
    <>
      <div
        className={classNames(
          `drawer__container drawer-${size} side-${side}`,
          {
            "slide-out": visible === true,
          },
          className
        )}
      >
        <Spin spinning={loading} indicator={antIcon}>
          <div className="drawer__content">
            <div className="drawer__header">
              <div
                className={classNames("drawer__header-text", {
                  "have-description": description,
                })}
              >
                <div className="title mr-1">
                  {title ? title : "Drawer Title"}
                </div>
                {description && (
                  <div className="description mr-1">{description}</div>
                )}
              </div>
              {!description && isHaveCloseIcon && (
                <Button
                  type="icon-only-ghost"
                  icon={<Close size={20} />}
                  className="btn--2xl"
                  onClick={handleClose}
                />
              )}
            </div>

            <div className={classNames(`drawer__body`)} ref={ref}>
              {props.children}
            </div>
            {visibleFooter && (
              <div className="drawer_footer">{renderModalFooter}</div>
            )}
          </div>
        </Spin>
      </div>
      {visible && <div className="overlay"></div>}
    </>
  );
}

Drawer.defaultProps = {
  visibleFooter: true,
  disableButton: false,
  numberButton: NUMBER_BUTTON.TWO,
  isHaveCloseIcon: true,
  size: "sm",
  side: "right",
};

export default Drawer;
