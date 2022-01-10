import { Close24 } from "@carbon/icons-react";
import { Spin } from "antd";
import { ModalProps as AntModalProps } from "antd/lib/modal";
import classNames from "classnames";
import Button from "components/Button";
import { NUMBER_BUTTON } from "config/enum";
import { TFunction } from "i18next";
import React, { ReactNode, RefObject } from "react";
import "./Drawer.scss";

export interface DrawerProps extends AntModalProps {
  children?: ReactNode;
  visibleFooter?: boolean;
  disableButton?: boolean;
  loading?: boolean;
  keyTitleTranslate?: string;
  keyButtonTranslate?: string;
  size?: NUMBER_BUTTON;
  handleCancel?: () => void;
  handleSave?: () => void;
  handleCreate?: () => void;
  translate?: TFunction;
}

function Drawer(props: DrawerProps) {
  const {
    visibleFooter,
    visible,
    disableButton,
    loading,
    keyTitleTranslate,
    keyButtonTranslate,
    size,
    handleCancel,
    handleSave,
    handleCreate,
    translate,
  } = props;
  const ref: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const renderModalFooter = React.useMemo(
    () => (
      <div className="button-bleed-footer">
        <Button
          type="bleed-primary"
          className={classNames(size === NUMBER_BUTTON.THREE ? "button-33" : "button-50")}
          onClick={handleSave}
          disabled={disableButton}
        >
          <span>
            {keyButtonTranslate && translate
              ? translate(`${keyButtonTranslate}.create`)
              : "Create"}
          </span>
        </Button>
        {size === NUMBER_BUTTON.THREE && (
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
          className={classNames(size === NUMBER_BUTTON.THREE ? "button-33" : "button-50")}
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
      size,
      disableButton,
      keyButtonTranslate
    ]
  );
  return (
    <>
      <div
        className={classNames("animation-modal__container", {
          "slide-out": visible === true,
        })}
      >
        <Spin spinning={loading}>
          <div className="animation-modal__content">
            <div className="animation-modal__header">
              <div className="animation-modal__header-text">
                <div className=" mr-1">
                  {keyTitleTranslate && translate
                    ? translate(`${keyTitleTranslate}.title`)
                    : "Drawer Title"}
                </div>
              </div>
              <div className="button-cancel" onClick={handleCancel}>
                <Close24 />
              </div>
            </div>

            <div className={classNames(`animation-modal__body`)} ref={ref}>
              {props.children}
            </div>
            {visibleFooter && (
              <div className="animation-modal_footer">{renderModalFooter}</div>
            )}
          </div>
        </Spin>
        {/* )} */}
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
  size: NUMBER_BUTTON.TWO
};

export default Drawer;
