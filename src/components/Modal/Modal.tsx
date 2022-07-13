import React, { ReactNode } from "react";
import "./Modal.scss";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import Button from "components/Button";
import Close20 from "@carbon/icons-react/es/close/20";


export enum MODAL_SIZE {
  '320px' = 320,
  '520px' = 520,
  '720px' = 720,
  '1024px' = 1024,
  '1200px' = 1200
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
}

function Modal(props: ModalCustomProps) {
  const {
    visibleFooter,
    size,
    titleButtonApply,
    titleButtonApplyNext,
    titleButtonCancel,
    destroyOnClose,
    handleCancel,
    handleSave,
    handleApplyNext,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="footer-modal">
        <div
          className={classNames("button-bleed-footer", )}
        >
          <Button
            type="bleed-secondary"
            className={classNames(
              handleApplyNext && size !== MODAL_SIZE["320px"] && size !== MODAL_SIZE["520px"] ? "button-33" : "button-50"
            )}
            onClick={handleCancel}
          >
            <span>{titleButtonCancel ? titleButtonCancel : "Cancel"}</span>
          </Button>

          {handleApplyNext && size !== MODAL_SIZE["320px"] && size !== MODAL_SIZE["520px"] && (
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
            <Button
              type="bleed-primary"
              className={classNames(
                handleApplyNext && size !== MODAL_SIZE["320px"] && size !== MODAL_SIZE["520px"] ? "button-33" : "button-50"
              )}
              onClick={handleSave}
            >
              <span>{titleButtonApply ? titleButtonApply : "Apply"}</span>
            </Button>
          )}
        </div>
      </div>
    ),
    [
      handleApplyNext,
      size,
      handleSave,
      titleButtonApply,
      titleButtonApplyNext,
      handleCancel,
      titleButtonCancel,
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
  size: MODAL_SIZE["1024px"],
  destroyOnClose: true,
};
export default Modal;
