import React, { ReactNode } from "react";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import Button from "@Components/Button";
import Close20 from "@carbon/icons-react/es/close/20";
import InlineLoading from "@Components/InlineLoading";
import "./TearSheet.scss";

export interface TearSheetProps extends AntModalProps {
  children?: ReactNode;
  /**Is the modal footer (cancel, apply, apply next button) visible or not*/
  visibleFooter?: boolean;
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
  /**Pass the classname to change the style component*/
  className?: string;
}

function TearSheet(props: TearSheetProps) {
  const {
    visibleFooter,
    titleButtonApply,
    titleButtonApplyNext,
    titleButtonCancel,
    destroyOnClose,
    loadingType,
    handleCancel,
    handleSave,
    handleApplyNext,
    className,
  } = props;
  const renderModalFooter = React.useMemo(
    () => (
      <div className="footer-modal">
        <div className={classNames("button-bleed-footer")}>
          <Button type="bleed-secondary" onClick={handleCancel}>
            <span>{titleButtonCancel ? titleButtonCancel : "Cancel"}</span>
          </Button>

          {handleApplyNext && (
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
        <Close20 />
      </div>
    );
  }, []);

  return (
    <>
      <AntModal
        {...props}
        destroyOnClose={destroyOnClose}
        className={classNames("tear-sheet__container", className)}
        closeIcon={CloseButton}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
      >
        <div className="tear-sheet_content">{props.children}</div>
      </AntModal>
    </>
  );
}
TearSheet.defaultProps = {
  destroyOnClose: true,
  loadingType: "default",
};
export default TearSheet;
