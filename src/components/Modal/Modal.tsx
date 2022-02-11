import React, { ReactNode } from "react";
import "./Modal.scss";
import AntModal, { ModalProps as AntModalProps } from "antd/lib/modal";
import { TFunction } from "i18next";
import classNames from "classnames";
import Button from "components/Button";
import { Close20 } from "@carbon/icons-react";
export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  visibleFooter?: boolean;
  size?: "large" | "medium" | "small";
  keyButtonApply?: string;
  keyButtonApplyNext?: string;
  keyButtonCancel?: string;
  handleCancel?: (event: any) => void;
  handleSave?: (event: any) => void;
  handleApplyNext?: (event: any) => void;
  translate?: TFunction;
}
function Modal(props: ModalCustomProps) {
  const {
    visibleFooter,
    size,
    keyButtonApply,
    keyButtonApplyNext,
    keyButtonCancel,
    destroyOnClose,
    handleCancel,
    handleSave,
    translate,
    handleApplyNext,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="footer-modal">
        <div
          className={classNames("button-bleed-footer", {
            "width-75": handleApplyNext && size === "large",
          })}
        >
          <Button
            type="bleed-secondary"
            className={classNames(
              handleApplyNext && size === "large" ? "button-33" : "button-50"
            )}
            onClick={handleCancel}
          >
            <span>
              {keyButtonCancel && translate
                ? translate(`${keyButtonCancel}`)
                : "Cancel"}
            </span>
          </Button>

          {handleApplyNext && size === "large" && (
            <Button
              type="bleed-secondary"
              className="button-33"
              onClick={handleApplyNext}
            >
              <span>
                {keyButtonApplyNext && translate
                  ? translate(`${keyButtonApplyNext}`)
                  : "Apply Next"}
              </span>
            </Button>
          )}
          <Button
            type="bleed-primary"
            className={classNames(
              handleApplyNext && size === "large" ? "button-33" : "button-50"
            )}
            onClick={handleSave}
          >
            <span>
              {keyButtonApply && translate
                ? translate(`${keyButtonApply}`)
                : "Apply"}
            </span>
          </Button>
        </div>
      </div>
    ),
    [
      handleApplyNext,
      size,
      handleSave,
      keyButtonApply,
      translate,
      keyButtonApplyNext,
      handleCancel,
      keyButtonCancel,
    ]
  );
  return (
    <>
      <AntModal
        {...props}
        style={{ top: 20 }}
        destroyOnClose={destroyOnClose}
        className={classNames("modal__container", `size-${size}`)}
        closeIcon={
          <Button
            type="icon-only-ghost"
            icon={<Close20 />}
            className="btn--xxl"
          />
        }
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
  destroyOnClose: true,
};
export default Modal;
