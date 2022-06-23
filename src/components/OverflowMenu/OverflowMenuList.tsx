import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import ReactDOM from "react-dom";
import "./OverflowMenu.scss";

export interface CustomProps {
  setExpand?: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  appendToBody?: boolean;
  selectListRef?: RefObject<HTMLDivElement>;
  appendToBodyStyle?: React.CSSProperties;
}
function OverflowMenuList(props: CustomProps) {
  const { setExpand, children, selectListRef, appendToBodyStyle } = props;
  return ReactDOM.createPortal(
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
      <div className="overflow__list select__list-container" style={appendToBodyStyle}>
        <div
          className="select__list"
          data-floating-menu-direction="bottom"
          onClick={() => setExpand(false)}
          ref={selectListRef}
        >
          <>{children}</>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default OverflowMenuList;
