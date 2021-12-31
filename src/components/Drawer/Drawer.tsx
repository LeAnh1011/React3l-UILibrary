import { Close24 } from "@carbon/icons-react";
import { Spin } from "antd";
import { ModalProps as AntModalProps } from "antd/lib/modal";
import classNames from "classnames";
import { TFunction } from "i18next";
import React, { ReactNode, RefObject } from "react";
import "./Drawer.scss";

export interface DrawerProps extends AntModalProps {
  handleCancel?: () => void;

  handleSave?: (value?: any) => void;

  children?: ReactNode;

  visibleFooter?: boolean;
  visibleCreate?: boolean;

  visibleCreateNext?: boolean;

  handleCreate?: () => void;
  model?: any;
  disableButton?: boolean;
  loading?: boolean;
  keyTitleTranslate?: string;
  keyButtonTranslate?: string;
  translate?: TFunction;
  isPreview?: boolean;
}

function Drawer(props: DrawerProps) {
  const {
    handleCancel,
    handleSave,
    visibleFooter,
    handleCreate,
    model,
    visible,
    visibleCreate,
    visibleCreateNext,
    disableButton,
    loading,
    keyTitleTranslate,
    keyButtonTranslate,
    isPreview,
    translate,
  } = props;
  const ref: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const renderModalFooter = React.useMemo(
    () => (
      <div className="d-flex justify-content-start">
        {model?.id ? (
          <button
            className="btn component__btn-primary  mr-3"
            onClick={handleSave}
          >
            <span>
              {keyButtonTranslate && translate
                ? translate(`${keyButtonTranslate}.save`)
                : "Save"}
            </span>
          </button>
        ) : (
          <>
            {visibleCreate && (
              <button
                className="btn component__btn-primary  mr-3"
                onClick={handleSave}
                disabled={disableButton}
              >
                <span>
                  {keyButtonTranslate && translate
                    ? translate(`${keyButtonTranslate}.create`)
                    : "Create"}
                </span>
              </button>
            )}
            {visibleCreateNext && (
              <button
                className="btn component__btn-outline-primary mr-3"
                onClick={handleCreate}
                disabled={disableButton}
              >
                <span>
                  {keyButtonTranslate && translate
                    ? translate(`${keyButtonTranslate}.createNext`)
                    : "Create Next"}
                </span>
              </button>
            )}
          </>
        )}

        <button
          className="btn component__btn-outline-primary"
          onClick={handleCancel}
        >
          <span>
            {keyButtonTranslate && translate
              ? translate(`${keyButtonTranslate}.close`)
              : "Close"}
          </span>
        </button>
      </div>
    ),
    [
      model?.id,
      handleSave,
      keyButtonTranslate,
      translate,
      visibleCreate,
      disableButton,
      visibleCreateNext,
      handleCreate,
      handleCancel,
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
                {isPreview ? (
                  <>
                    {keyTitleTranslate && translate
                      ? translate(`${keyTitleTranslate}.preview`)
                      : "Drawer Preview"}
                  </>
                ) : (
                  <>
                    {model?.id ? (
                      <div className=" mr-1">
                        {keyTitleTranslate && translate
                          ? translate(`${keyTitleTranslate}.title`)
                          : "Drawer Title"}
                      </div>
                    ) : (
                      <>
                        {keyTitleTranslate && translate
                          ? translate(`${keyTitleTranslate}.preview`)
                          : "Drawer Create"}
                      </>
                    )}
                  </>
                )}
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
  isPreview: false,
};

export default Drawer;
