import { TrashCan16 } from "@carbon/icons-react";
import { ModalProps as AntModalProps } from "antd/lib/modal";
import Button from "components/Button";
import React, { ReactNode } from "react";
import "./OverflowMenu.scss";
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
function OverflowMenu(props: ModalCustomProps) {
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
  

  return (
    <>
      <div className="overflow-menu__container">
        <div className="overflow-menu__button">
        <Button
          type="icon-only-ghost"
          icon={<TrashCan16 />}
          className="btn--xxl"
          
        />
        </div>
      </div>
    </>
  );
}
OverflowMenu.defaultProps = {
  size: "lg",
  destroyOnClose: true,
};
export default OverflowMenu;
