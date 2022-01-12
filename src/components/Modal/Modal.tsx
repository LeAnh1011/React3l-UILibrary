import React, { ReactNode } from "react";
import "./Modal.scss";
import AntModal, { ModalProps as AntModalProps } from "antd/lib/modal";
import { TFunction } from "i18next";
import classNames from "classnames";
import Button from "components/Button";
import { Close24 } from "@carbon/icons-react";
export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  visibleFooter?: boolean;
  size?: "large" | "medium" | "small";
  keyButtonTranslate?: string;
  handleCancel?: (event: any) => void;
  handleSave?: (event: any) => void;
  handleCreateNext?: (event: any) => void;
  translate?: TFunction;
}
function Modal(props: ModalCustomProps) {
  const {
    visibleFooter,
    size,
    keyButtonTranslate,
    destroyOnClose,
    handleCancel,
    handleSave,
    translate,
    handleCreateNext,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="footer-modal">
        <div
          className={classNames("button-bleed-footer", {
            "width-75": handleCreateNext && size === "large",
          })}
        >
          <Button
            type="bleed-secondary"
            className={classNames(
              handleCreateNext && size === "large" ? "button-33" : "button-50"
            )}
            onClick={handleSave}
          >
            <span>
              {keyButtonTranslate && translate
                ? translate(`${keyButtonTranslate}.save`)
                : "Save"}
            </span>
          </Button>
          {handleCreateNext && size === "large" && (
            <Button
              type="bleed-secondary"
              className="button-33"
              onClick={handleCreateNext}
            >
              <span>
                {keyButtonTranslate && translate
                  ? translate(`${keyButtonTranslate}.createNext`)
                  : "Create Next"}
              </span>
            </Button>
          )}

          <Button
            type="bleed-primary"
            className={classNames(
              handleCreateNext && size === "large" ? "button-33" : "button-50"
            )}
            onClick={handleCancel}
          >
            <span>
              {keyButtonTranslate && translate
                ? translate(`${keyButtonTranslate}.cancel`)
                : "Cancel"}
            </span>
          </Button>
        </div>
      </div>
    ),
    [
      handleCreateNext,
      size,
      handleSave,
      keyButtonTranslate,
      translate,
      handleCancel,
    ]
  );
  return (
    <>
      <AntModal
        {...props}
        style={{ top: 20 }}
        destroyOnClose={destroyOnClose}
        className={classNames("modal__container", `size-${size}`)}
        closeIcon={<Close24 />}
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
  destroyOnClose: true
};
export default Modal;
