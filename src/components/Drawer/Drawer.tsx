import { Close20 } from "@carbon/icons-react";
import { Spin } from "antd";
import classNames from "classnames";
import Button from "components/Button";
import { NUMBER_BUTTON } from "config/enum";
import { TFunction } from "i18next";
import React, { ReactNode, RefObject } from "react";
import "./Drawer.scss";

export interface DrawerProps {
  children?: ReactNode;
  visible?: boolean;
  visibleFooter?: boolean;
  disableButton?: boolean;
  loading?: boolean;
  keyHeaderTranslate?: string;
  keyButtonTranslate?: string;
  numberButton?: NUMBER_BUTTON;
  handleCancel?: () => void;
  handleSave?: () => void;
  handleCreate?: () => void;
  translate?: TFunction;
  isHaveDescription?: boolean;
  isHaveCloseIcon?: boolean;
  size?: "sm" | "lg";
}

function Drawer(props: DrawerProps) {
  const {
    visibleFooter,
    visible,
    disableButton,
    loading,
    keyHeaderTranslate,
    keyButtonTranslate,
    numberButton,
    handleCancel,
    handleSave,
    handleCreate,
    translate,
    isHaveDescription,
    isHaveCloseIcon,
    size,
  } = props;
  const ref: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const renderModalFooter = React.useMemo(
    () => (
      <div className="button-bleed-footer">
        <Button
          type="bleed-primary"
          className={classNames(
            numberButton === NUMBER_BUTTON.THREE ? "button-33" : "button-50"
          )}
          onClick={handleSave}
          disabled={disableButton}
        >
          <span>
            {keyButtonTranslate && translate
              ? translate(`${keyButtonTranslate}.create`)
              : "Create"}
          </span>
        </Button>
        {numberButton === NUMBER_BUTTON.THREE && (
          <Button
            type="bleed-secondary"
            className="button-33"
            onClick={handleCreate}
            disabled={disableButton}
          >
            <span>
              {keyButtonTranslate && translate
                ? translate(`${keyButtonTranslate}.createNext`)
                : "Create Next"}
            </span>
          </Button>
        )}
        <Button
          type="bleed-secondary"
          className={classNames(
            numberButton === NUMBER_BUTTON.THREE ? "button-33" : "button-50"
          )}
          onClick={handleCancel}
        >
          <span>
            {keyButtonTranslate && translate
              ? translate(`${keyButtonTranslate}.close`)
              : "Close"}
          </span>
        </Button>
      </div>
    ),
    [
      handleSave,
      translate,
      handleCreate,
      handleCancel,
      numberButton,
      disableButton,
      keyButtonTranslate,
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
                  "have-description": isHaveDescription,
                })}
              >
                <div className="title mr-1">
                  {keyHeaderTranslate && translate
                    ? translate(`${keyHeaderTranslate}.title`)
                    : "Drawer Title"}
                </div>
                {isHaveDescription && (
                  <div className="description mr-1">
                    {keyHeaderTranslate && translate
                      ? translate(`${keyHeaderTranslate}.description`)
                      : "Drawer description description description description"}
                  </div>
                )}
              </div>
              {!isHaveDescription && isHaveCloseIcon && (
                <Button
                  type="icon-only-ghost"
                  icon={<Close20 />}
                  className="btn--xxl"
                  onClick={handleCancel}
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
  closable: false,
  visibleCreate: true,
  visibleCreateNext: true,
  disableButton: false,
  numberButton: NUMBER_BUTTON.TWO,
  isHaveCloseIcon: true,
  size: "sm",
};

export default Drawer;
