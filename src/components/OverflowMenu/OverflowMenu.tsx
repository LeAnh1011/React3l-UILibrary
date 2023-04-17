import OverflowMenuVertical16 from "@carbon/icons-react/es/overflow-menu--vertical/16";
import OverflowMenuHorizontal16 from "@carbon/icons-react/es/overflow-menu--horizontal/16";
import classNames from "classnames";
import React, { RefObject } from "react";
import { CommonService } from "@Services/common-service";
import OverflowMenuList, { ListOverflowMenu } from "./OverflowMenuList";
import "./OverflowMenu.scss";

export interface CustomProps {
  list?: ListOverflowMenu[];
  size?: "md" | "xl";
  appendToBody?: boolean;
  type?: "vertical" | "horizontal";
  disabled?: boolean;
}

function OverflowMenu(props: CustomProps) {
  const { size, list, type, disabled } = props;

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const buttonRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const handleExpand = React.useCallback(() => {
    setExpand(true);
  }, []);

  const handleKeyDown = React.useCallback((event: any) => {
    switch (event.keyCode) {
      case 40:
        const firstItem = selectListRef.current
          .firstElementChild as HTMLElement;
        firstItem.focus();
        break;
      case 9:
        setExpand(false);
        break;
      default:
        return;
    }
  }, []);

  const [check, setCheck] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (isExpand && check) {
      const currentPosition = buttonRef.current.getBoundingClientRect();
      if (size === "md") {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 32,
          right: window.innerWidth - currentPosition.right,
        });
        setCheck(false);
      } else {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 40,
          right: window.innerWidth - currentPosition.right,
        });
        setCheck(false);
      }
    }
  }, [appendToBodyStyle, check, isExpand, size]);

  const handleCloseList = React.useCallback(() => {
    setExpand(false);
    setCheck(true);
  }, []);

  CommonService.useClickOutside(selectListRef, handleCloseList);

  return (
    <div className="overflow-menu__container" ref={wrapperRef}>
      <div
        className={classNames("overflow-menu__button", {
          "overflow-menu__button--md": size === "md",
          "overflow-menu__button--xl": size === "xl",
        })}
        ref={buttonRef}
      >
        <button
          className={classNames(
            "btn-component btn-only-icon btn--icon-only-ghost",
            {
              "btn--md": size === "md",
              "btn--xl": size === "xl",
              "btn--shadow": isExpand,
              "overflow-menu--disabled": disabled,
            }
          )}
          onClick={handleExpand}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        >
          {type === "vertical" ? (
            <OverflowMenuVertical16 />
          ) : (
            <OverflowMenuHorizontal16 />
          )}
        </button>
      </div>
      {isExpand && (
        <OverflowMenuList
          setExpand={setExpand}
          list={list}
          selectListRef={selectListRef}
          appendToBodyStyle={appendToBodyStyle}
          size={size}
        />
      )}
    </div>
  );
}
OverflowMenu.defaultProps = {
  size: "md",
  type: "vertical",
};
export default OverflowMenu;
