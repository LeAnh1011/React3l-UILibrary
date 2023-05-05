import Button from "@Components/Button";
import Close20 from "@carbon/icons-react/es/close/20";
import { ModalProps as AntModalProps } from "antd";
import classNames from "classnames";
import React, { ReactNode } from "react";
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
  visible?: boolean;
}

function TearSheet(props: TearSheetProps) {
  const { handleCancel, handleSave, className, visible } = props;

  React.useEffect(() => {
    if (visible) {
      document
        .getElementById("tear-sheet__component")
        .classList.add("active-bg");
      document
        .getElementById("tear-sheet__container")
        .classList.add("active-content");
    } else {
      if (
        document
          .getElementById("tear-sheet__container")
          .classList.contains("active-content")
      ) {
        document
          .getElementById("tear-sheet__component")
          .classList.remove("active-bg");
        document
          .getElementById("tear-sheet__container")
          .classList.remove("active-content");
      }
    }
  }, [visible]);

  return (
    <div className="tear-sheet__component" id="tear-sheet__component">
      <div
        className={classNames("tear-sheet__container", className)}
        id="tear-sheet__container"
      >
        <div className="tear-sheet__header">
          <div className="tear-sheet__header-title">First Sheet</div>
          <div className="tear-sheet__header-description">
            Generic description
          </div>
          <div className="tear-sheet__header-additional-content">
            Header additional content
          </div>
          <Button
            type="icon-only-ghost"
            className="btn btn--2xl button-close"
            icon={<Close20 />}
            onClick={handleCancel}
          />
        </div>
        <div className="tear-sheet__body"></div>
        <div className="tear-sheet__footer">
          <Button type="bleed-secondary" onClick={handleCancel}>
            Đóng
          </Button>
          <Button type="bleed-primary" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
TearSheet.defaultProps = {};
export default TearSheet;
