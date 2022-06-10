import { TrashCan16 } from "@carbon/icons-react";
import { ModalProps as AntModalProps } from "antd/lib/modal";
import Button from "components/Button";
import IconLoading from "components/IconLoading";
import React, { ReactNode, RefObject } from "react";
import "./OverflowMenu.scss";
export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  size?: "lg" | "md" | "sm";

}
function OverflowMenu(props: ModalCustomProps) {
  const {
    size,
    children
  } = props;

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [loading, setLoading] = React.useState<boolean>(false);
  

  const handleExpand = React.useCallback(()=>{
    setExpand(true)
  },[])

  return (
    <>
      <div className="overflow-menu__container">
        <div className="overflow-menu__button">
        <Button
          type="icon-only-ghost"
          icon={<TrashCan16 />}
          className="btn--xxl"
          onClick={handleExpand}
        />
        
        </div>
        {isExpand && (
          <div className="select__list-container" style={appendToBodyStyle}>
            {!loading ? (
                <>{children}</>
            ) : (
              <div className="select__loading">
                <IconLoading color="#0F62FE" size={24} />
              </div>
            )}
           
          </div>
        )}
      </div>
    </>
  );
}
OverflowMenu.defaultProps = {
  size: "lg",
  destroyOnClose: true,
};
export default OverflowMenu;
