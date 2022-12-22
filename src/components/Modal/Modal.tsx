import React, { ReactNode } from "react";
import "./Modal.scss";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import Button from "@Components/Button";
import Close20 from "@carbon/icons-react/es/close/20";
import InlineLoading from "@Components/InlineLoading";

export enum MODAL_SIZE {
  SIZE_320 = 320,
  SIZE_520 = 520,
  SIZE_720 = 720,
  SIZE_1024 = 1024,
  SIZE_1200 = 1200,
}

export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  visibleFooter?: boolean;
  size?: MODAL_SIZE;
  titleButtonApply?: string;
  titleButtonApplyNext?: string;
  titleButtonCancel?: string;
  handleCancel?: (event: any) => void;
  handleSave?: (event: any) => void;
  handleApplyNext?: (event: any) => void;
  loadingType?: "default" | "submitting" | "submitted" | "error";
}

function Modal(props: ModalCustomProps) {
  const {
    visibleFooter,
    size,
    titleButtonApply,
    titleButtonApplyNext,
    titleButtonCancel,
    destroyOnClose,
    loadingType,
    handleCancel,
    handleSave,
    handleApplyNext,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="footer-modal">
        <div className={classNames("button-bleed-footer")}>
          <Button
            type="bleed-secondary"
            className={classNames(
              handleApplyNext &&
                size !== MODAL_SIZE.SIZE_320 &&
                size !== MODAL_SIZE.SIZE_520
                ? "button-33"
                : "button-50"
            )}
            onClick={handleCancel}
          >
            <span>{titleButtonCancel ? titleButtonCancel : "Cancel"}</span>
          </Button>

          {handleApplyNext &&
            size !== MODAL_SIZE.SIZE_320 &&
            size !== MODAL_SIZE.SIZE_520 && (
              <Button
                type="bleed-secondary"
                className="button-33"
                onClick={handleApplyNext}
              >
                <span>
                  {titleButtonApplyNext ? titleButtonApplyNext : "Apply Next"}
                </span>
              </Button>
            )}
          {handleSave && (
            <>
              <Button
                type="bleed-primary"
                className={classNames(
                  handleApplyNext &&
                    size !== MODAL_SIZE.SIZE_320 &&
                    size !== MODAL_SIZE.SIZE_520
                    ? "button-33"
                    : "button-50"
                )}
                disabled={loadingType !== "default"}
                onClick={handleSave}
              >
                {loadingType !== "default" ? (
                  <InlineLoading
                    status={loadingType}
                    className="il-normal-no-icon btn--sm"
                  />
                ) : (
                  <span>{titleButtonApply ? titleButtonApply : "Apply"}</span>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    ),
    [
      handleApplyNext,
      size,
      handleCancel,
      titleButtonCancel,
      titleButtonApplyNext,
      handleSave,
      loadingType,
      titleButtonApply,
    ]
  );

  const CloseButton = React.useMemo(() => {
    return (
      <div
        className={classNames(
          "btn-component btn-only-icon btn--xxl btn--icon-only-ghost"
        )}
      >
        <Close20 />
      </div>
    );
  }, []);

  return (
    <>
      <AntModal
        {...props}
        style={{ top: 72, width: 1500 }}
        destroyOnClose={destroyOnClose}
        className={classNames("modal__container")}
        closeIcon={CloseButton}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
        width={size}
      >
        <div className="modal_content">{props.children}</div>
      </AntModal>
    </>
  );
}
Modal.defaultProps = {
  size: MODAL_SIZE.SIZE_1024,
  destroyOnClose: true,
  loadingType: "default",
};
export default Modal;
