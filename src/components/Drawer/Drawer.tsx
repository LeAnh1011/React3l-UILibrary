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
  keyTitle?: string;
  translate?: TFunction;
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
    title,
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
            <span>{"save"}</span>
          </button>
        ) : (
          <>
            {visibleCreate && (
              <button
                className="btn component__btn-primary  mr-3"
                onClick={handleSave}
                disabled={disableButton}
              >
                <span>{"create"}</span>
              </button>
            )}
            {visibleCreateNext && (
              <button
                className="btn component__btn-outline-primary mr-3"
                onClick={handleCreate}
                disabled={disableButton}
              >
                <span>{"createNext"}</span>
              </button>
            )}
          </>
        )}

        <button
          className="btn component__btn-outline-primary"
          onClick={handleCancel}
        >
          <span>{"close"}</span>
        </button>
      </div>
    ),
    [
      model,
      handleSave,
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
              <div className="animation-modal__header-text">{title}</div>
              <i className="tio-clear" onClick={handleCancel}></i>
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
  isTitle: true,
};

export default Drawer;
