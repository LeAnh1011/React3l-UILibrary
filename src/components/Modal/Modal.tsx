import React, { ReactNode } from "react";
import "./Modal.scss";
import AntModal, { ModalProps as AntModalProps } from "antd/lib/modal";
import { TFunction } from "i18next";
import classNames from "classnames";
export interface ModalCustomProps extends AntModalProps {
  handleCancel?: () => void;
  handleSave?: (value?: any) => void;
  children?: ReactNode;
  visibleFooter?: boolean;
  handleCreate?: () => void;
  handleDelete?: (value?: any) => void;
  model?: any;
  modalSize?: "large" | "medium" | "small";
  keyTranslate?: string;
  translate?: TFunction;
}
function Modal(props: ModalCustomProps) {
  const {
    handleCancel,
    handleSave,
    visibleFooter,
    modalSize,
    // translate,
    // keyTranslate,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="d-flex">
        <button
          className="btn component__btn-primary mr-2"
          onClick={handleSave}
        >
          <span>{`save`}</span>
        </button>
        <button
          className="component__btn-outline-primary"
          onClick={handleCancel}
        >
          <span>{`cancel`}</span>
        </button>
      </div>
    ),
    [handleSave, handleCancel]
  );
  return (
    <>
      <AntModal
        {...props}
        style={{ top: 20 }}
        destroyOnClose={true}
        className={classNames("modal__container", `size-${modalSize}`)}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
      >
        <div className="modal_content">{props.children}</div>
      </AntModal>
    </>
  );
}
Modal.defaultProps = {
  modalSize: "large",
};
export default Modal;
