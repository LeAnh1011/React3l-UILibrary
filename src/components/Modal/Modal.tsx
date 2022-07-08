import React, { ReactNode } from "react";
import "./Modal.scss";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import Button from "components/Button";
import Close20 from "@carbon/icons-react/es/close/20";

export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  visibleFooter?: boolean;
  size?: "lg" | "md" | "sm";
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
          className={classNames("button-bleed-footer", {
            "width-75": handleApplyNext && size === "lg",
          })}
        >
          <Button
            type="bleed-secondary"
            className={classNames(
              handleApplyNext && size === "lg" ? "button-33" : "button-50"
            )}
            onClick={handleCancel}
          >
            <span>{titleButtonCancel ? titleButtonCancel : "Cancel"}</span>
          </Button>

          {handleApplyNext && size === "lg" && (
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
                handleApplyNext && size === "lg" ? "button-33" : "button-50"
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
        style={{ top: 72 }}
        destroyOnClose={destroyOnClose}
        className={classNames("modal__container", `size-${size}`)}
        closeIcon={CloseButton}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
      >
        <div className="modal_content">{props.children}</div>
      </AntModal>
    </>
  );
}
Modal.defaultProps = {
  size: "lg",
  destroyOnClose: true,
};
export default Modal;
