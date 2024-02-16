import React, { ReactNode } from "react";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import Button from "@Components/Button";
import { Close } from "@carbon/icons-react";
import InlineLoading from "@Components/InlineLoading";
import { MODAL_SIZE } from "@Configs/enum";
import { useSetState } from "ahooks";
import "./NonModal.scss";

export interface NonModalCustomProps extends AntModalProps {
  /**State open or close of non-modal component */
  open?: boolean;
  /**Children content of component */
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
  /**Pass value for element is draggable **/
  uniqueWrapClass?: string;
}

function NonModal(props: NonModalCustomProps) {
  const {
    visibleFooter,
    uniqueWrapClass,
    size,
    titleButtonApply,
    titleButtonApplyNext,
    titleButtonCancel,
    destroyOnClose,
    loadingType,
    open,
    handleCancel,
    handleSave,
    handleApplyNext,
  } = props;

  const [position, setPosition] = useSetState({ top: "72px", left: "50%" });

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

  React.useEffect(() => {
    if (uniqueWrapClass && open) {
      const rootElement = document.getElementsByClassName(
        uniqueWrapClass
      )[0] as HTMLElement;
      const containerElement = rootElement.getElementsByClassName(
        "non-modal__container"
      )[0] as HTMLElement;
      const headerElement = containerElement.getElementsByClassName(
        "ant-modal-header"
      )[0] as HTMLElement;

      let pos1: number, pos2: number, pos3: number, pos4: number;

      const dragMouseDown = (e: any) => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      };

      const elementDrag = (e: any) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        const top = containerElement.offsetTop - pos2;
        const left = containerElement.offsetLeft - pos1;
        setPosition({
          top: top + "px",
          left: left + "px",
        });
      };

      const closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      };

      headerElement.onmousedown = dragMouseDown;
    }
  }, [setPosition, open, uniqueWrapClass]);

  return (
    <>
      <AntModal
        {...props}
        open={open}
        style={position}
        destroyOnClose={destroyOnClose}
        className={classNames("non-modal__container", props?.className)}
        closeIcon={CloseButton}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
        width={size}
        mask={false}
        wrapClassName={uniqueWrapClass}
      >
        <div className="non-modal_content">{props.children}</div>
      </AntModal>
    </>
  );
}

NonModal.defaultProps = {
  size: MODAL_SIZE.SIZE_1024,
  destroyOnClose: true,
  loadingType: "default",
};

export default NonModal;
