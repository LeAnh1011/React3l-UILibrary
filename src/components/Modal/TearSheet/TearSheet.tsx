import Button from "@Components/Button";
import { Close } from "@carbon/icons-react";
import { ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import React, { ReactNode } from "react";
import InlineLoading from "@Components/InlineLoading/InlineLoading";
import "./TearSheet.scss";

export interface TearSheetProps extends AntModalProps {
  children?: ReactNode;
  /**Is the modal footer (cancel, save button) visible or not*/
  visibleFooter?: boolean;
  /**Name of save button*/
  titleButtonSave?: string;
  /**Name of cancel button*/
  titleButtonCancel?: string;
  /**Cancel the form*/
  handleCancel?: (event: any) => void;
  /**Save the form*/
  handleSave?: (event: any) => void;
  /**Pass state of loading */
  loadingType?: "default" | "submitting" | "submitted" | "error";
  /**Pass the classname to change the style component*/
  className?: string;
  /**Control the TearSheet visible or not*/
  visible?: boolean;
  /**Title of header TearSheet */
  title?: string;
  /**Description of header TearSheet  */
  description?: string;
  /**Additional content of header TearSheet  */
  additionalContent?: string;
}

function TearSheet(props: TearSheetProps) {
  const {
    handleCancel,
    handleSave,
    className,
    visible,
    children,
    visibleFooter,
    title,
    description,
    additionalContent,
    titleButtonSave,
    titleButtonCancel,
    loadingType,
  } = props;

  React.useEffect(() => {
    if (visible) {
      document.getElementById("background").classList.add("background-active");
      document.getElementById("content").classList.add("content-active");
    } else {
      if (
        document.getElementById("content").classList.contains("content-active")
      ) {
        document
          .getElementById("background")
          .classList.remove("background-active");
        document.getElementById("content").classList.remove("content-active");
      }
    }
  }, [visible]);

  return (
    <div className="tear-sheet__component" id="background">
      <div
        className={classNames("tear-sheet__container", className)}
        id="content"
      >
        <div
          className={classNames(
            "tear-sheet__header",
            additionalContent ? "" : "pb24px"
          )}
        >
          <div className="tear-sheet__header-title">{title}</div>
          <div className="tear-sheet__header-description">{description}</div>
          {additionalContent && (
            <div className="tear-sheet__header-additional-content">
              {additionalContent}
            </div>
          )}
          <Button
            type="icon-only-ghost"
            className="btn btn--2xl button-close"
            icon={<Close size={20} />}
            onClick={handleCancel}
          />
        </div>
        <div
          className={classNames(
            "tear-sheet__body",
            visibleFooter ? "pb60px" : ""
          )}
        >
          {children}
        </div>
        {visibleFooter && (
          <div className="tear-sheet__footer">
            <Button
              type="bleed-secondary"
              onClick={handleCancel}
              disabled={loadingType !== "default"}
            >
              {titleButtonCancel}
            </Button>
            <Button
              type="bleed-primary"
              onClick={handleSave}
              disabled={loadingType !== "default"}
            >
              {loadingType !== "default" ? (
                <InlineLoading
                  status={loadingType}
                  className="il-normal-no-icon btn--sm "
                />
              ) : (
                <span>{titleButtonSave}</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
TearSheet.defaultProps = {
  titleButtonSave: "Lưu",
  titleButtonCancel: "Đóng",
  visibleFooter: true,
  loadingType: "default",
};
export default TearSheet;
