import Close20 from "@carbon/icons-react/es/close/20";
import { Spin } from "antd";
import classNames from "classnames";
import Button from "@Components/Button";
import { NUMBER_BUTTON } from "@Configs/enum";
import React, { ReactNode, RefObject } from "react";
import "./Drawer.scss";

export interface DrawerProps {
  children?: ReactNode;
  visible?: boolean;
  visibleFooter?: boolean;
  disableButton?: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
  titleButtonApply?: string;
  titleButtonApplyNext?: string;
  titleButtonCancel?: string;
  numberButton?: NUMBER_BUTTON;
  handleClose?: () => void;
  handleCancel?: () => void;
  handleSave?: () => void;
  handleApplyNext?: () => void;
  isHaveCloseIcon?: boolean;
  size?: "sm" | "lg";
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
        className={classNames(`drawer__container drawer-${size}`, {
          "slide-out": visible === true,
        })}
      >
        <Spin spinning={loading}>
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
                  icon={<Close20 />}
                  className="btn--xl"
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
};

export default Drawer;
