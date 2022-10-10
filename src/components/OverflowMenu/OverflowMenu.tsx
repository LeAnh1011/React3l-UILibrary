import OverflowMenuVertical16 from "@carbon/icons-react/es/overflow-menu--vertical/16";
import classNames from "classnames";
import React, { RefObject } from "react";
import { CommonService } from "@Services/common-service";
import "./OverflowMenu.scss";
import OverflowMenuList from "./OverflowMenuList";
export interface CustomProps {
  list?: any[];
  size?: "sm"| "md" |"lg"| "xl" | "2xl";
  appendToBody?: boolean;
}
function OverflowMenu(props: CustomProps) {
  const { size, list, appendToBody } = props;

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
      if (size === "sm") {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 32,
          left: currentPosition.left - (160 - 32),
        });
        setCheck(false);
      } 
      if(size === "md") {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 36,
          left: currentPosition.left - (160 - 36),
        });
        setCheck(false);
      }
      if(size === "lg") {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 40,
          left: currentPosition.left - (160 - 40),
        });
        setCheck(false);
      }
      if(size === "xl") {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 48,
          left: currentPosition.left - (160 - 48),
        });
        setCheck(false);
      }
      if(size === "2xl") {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 56,
          left: currentPosition.left - (160 - 56),
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
        className={classNames("overflow-menu__button")}
        ref={buttonRef}
      >
        <button
          className={classNames(
            `btn-component btn-only-icon btn--icon-only-ghost btn--${size}`,
            {
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
  size: "sm",
  destroyOnClose: true,
};
export default OverflowMenu;
