import React, { ReactNode } from "react";
import "./Modal.scss";
import AntModal, { ModalProps as AntModalProps } from "antd/lib/modal";
import { TFunction } from "i18next";
import classNames from "classnames";
import Button from "components/Button";
export interface ModalCustomProps extends AntModalProps {
  handleCancel?: () => void;
  handleSave?: (value?: any) => void;
  children?: ReactNode;
  visibleFooter?: boolean;
  handleCreate?: () => void;
  handleDelete?: (value?: any) => void;
  model?: any;
  size?: "large" | "medium" | "small";
  keyButtonTranslate?: string;
  translate?: TFunction;
}
function Modal(props: ModalCustomProps) {
  const {
    handleCancel,
    handleSave,
    visibleFooter,
    size,
    translate,
    keyButtonTranslate,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="button-bleed-footer">
        <Button type="bleed-primary" className="button-50" onClick={handleSave}>
          <span>
            {keyButtonTranslate && translate
              ? translate(`${keyButtonTranslate}.save`)
              : "Save"}
          </span>
        </Button>
        <Button
          type="bleed-secondary"
          className="button-50"
          onClick={handleCancel}
        >
          <span>
            {keyButtonTranslate && translate
              ? translate(`${keyButtonTranslate}.cancel`)
              : "Cancel"}
          </span>
        </Button>
      </div>
    ),
    [handleSave, keyButtonTranslate, translate, handleCancel]
  );
  return (
    <>
      <AntModal
        {...props}
        style={{ top: 20 }}
        destroyOnClose={true}
        className={classNames("modal__container", `size-${size}`)}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
      >
        <div className="modal_content">{props.children}</div>
      </AntModal>
    </>
  );
}
Modal.defaultProps = {
  size: "large",
};
export default Modal;
