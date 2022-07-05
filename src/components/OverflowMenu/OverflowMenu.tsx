import { OverflowMenuVertical16 } from "@carbon/icons-react";
import classNames from "classnames";
import React, { RefObject } from "react";
import { CommonService } from "services/common-service";
import "./OverflowMenu.scss";
import OverflowMenuList from "./OverflowMenuList";
export interface CustomProps {
  children?: any;
  size?: "md" | "xl";
  appendToBody?: boolean;
}
function OverflowMenu(props: CustomProps) {
  const { size, children, appendToBody } = props;

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
          left: currentPosition.left - (160 - 32),
        });
        setCheck(false);
      } else {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 40,
          left: currentPosition.left - (160 - 40),
        });
        setCheck(false);
      }
    }
  }, [appendToBody, appendToBodyStyle, check, isExpand, size]);

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
            }
          )}
          onClick={handleExpand}
          onKeyDown={handleKeyDown}
        >
          <OverflowMenuVertical16 />
        </button>
      </div>
      {isExpand && (
        <OverflowMenuList
          setExpand={setExpand}
          children={children}
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
  destroyOnClose: true,
};
export default OverflowMenu;
