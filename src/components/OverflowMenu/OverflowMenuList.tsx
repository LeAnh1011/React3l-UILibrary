import classNames from "classnames";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import ReactDOM from "react-dom";
import "./OverflowMenu.scss";
export interface ListOverflowMenu {
  title: string;
  action: (params?: any) => void;
  isShow: boolean;
}
export interface CustomProps {
  setExpand?: Dispatch<SetStateAction<boolean>>;
  list?: ListOverflowMenu[];
  appendToBody?: boolean;
  selectListRef?: RefObject<HTMLDivElement>;
  appendToBodyStyle?: React.CSSProperties;
  size?: "md" | "xl";
  floatingDirection: "bottom" | "top";
}

function OverflowMenuList(props: CustomProps) {
  const {
    setExpand,
    list,
    selectListRef,
    appendToBodyStyle,
    size,
    floatingDirection,
  } = props;

  const handleMove = React.useCallback(
    (action) => (event: any) => {
      switch (event.keyCode) {
        case 13:
          action();
          event.preventDefault();
          break;
        case 40:
          if (event.target.nextElementSibling !== null) {
            event.target.nextElementSibling.focus();
          }
          event.preventDefault();
          break;
        case 38:
          if (event.target.previousElementSibling !== null) {
            event.target.previousElementSibling.focus();
          }
          event.preventDefault();
          break;
      }
      return;
    },
    []
  );

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
      }}
    >
      <div
        className="overflow__list select__list-container"
        style={appendToBodyStyle}
      >
        <div
          className={classNames("select__list", {
            "select__list--md": size === "md",
            "select__list--xl": size === "xl",
          })}
          data-floating-menu-direction={floatingDirection}
          onClick={() => setExpand(false)}
          ref={selectListRef}
        >
          {list &&
            list?.length > 0 &&
            list.map(
              (item: ListOverflowMenu, index: number) =>
                item.isShow && (
                  <button
                    className={classNames("select__item ", {
                      "btn--md p-l--sm p-y--2xs": size === "md",
                      "btn--xl p-l--sm p-y--xs": size === "xl",
                    })}
                    key={index}
                    onKeyDown={handleMove(item?.action)}
                    tabIndex={index}
                    onClick={item?.action}
                  >
                    <span className="select__text">{item?.title}</span>
                  </button>
                )
            )}
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default OverflowMenuList;
