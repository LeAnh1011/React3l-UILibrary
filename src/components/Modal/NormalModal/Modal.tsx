import React, { ReactNode } from "react";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import Button from "@Components/Button";
import { Close } from "@carbon/icons-react";
import InlineLoading from "@Components/InlineLoading";
import "./Modal.scss";
import { MODAL_SIZE } from "@Configs/enum";

export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  /**Is the modal footer (cancel, apply, apply next button) visible or not*/
  visibleFooter?: boolean;
  /**Change the size of modal*/
  size?: MODAL_SIZE;
  /**Name of apply button*/
  titleButtonApply?: string;
  /**Name of apply next button*/
  titleButtonApplyNext?: string;
  /**Name of cancel button*/
  titleButtonCancel?: string;
  /**Cancel the form*/
  handleCancel?: (event: any) => void;
  /**Save the form*/
  handleSave?: (event: any) => void;
  /**Apply and process to next form*/
  handleApplyNext?: (event: any) => void;
  /**Pass state of loading */
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
          "btn-component btn-only-icon btn--2xl btn--icon-only-ghost"
        )}
      >
        <Close size={20} />
      </div>
    );
  }, []);

  return (
    <>
      <AntModal
        {...props}
        style={{ top: 72, width: 1500 }}
        destroyOnClose={destroyOnClose}
        className={classNames("modal__container", props?.className)}
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
