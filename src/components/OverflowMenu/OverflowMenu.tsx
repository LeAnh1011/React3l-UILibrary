import { OverflowMenuVertical16 } from "@carbon/icons-react";
import classNames from "classnames";
import Button from "components/Button";
import React, { ReactNode, RefObject } from "react";
import { CommonService } from "services/common-service";
import "./OverflowMenu.scss";
import OverflowMenuList from "./OverflowMenuList";
export interface CustomProps {
  children?: ReactNode;
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

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const handleExpand = React.useCallback(() => {
    setExpand(true);

    setTimeout(() => {
      const element = selectListRef.current?.children[0] as HTMLElement;
      element.focus();
    }, 50);
  }, []);

  CommonService.useClickOutside(wrapperRef, () => setExpand(false));

  const [check, setCheck] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (isExpand  && check) {
      const currentPosition = wrapperRef.current.getBoundingClientRect();
      console.log(currentPosition.top);
      console.log(wrapperRef.current.clientHeight)
      const spaceBelow = window.innerHeight - currentPosition.bottom;
      if (spaceBelow <= 200) {
        setTimeout(() => {
          const listHeight = selectListRef.current
            ? selectListRef.current.clientHeight
            : 180;
          setAppendToBodyStyle({
            position: "absolute",
            top: currentPosition.top - listHeight,
            left: currentPosition.left - (160 - 32),
          });
        }, 100);
        setCheck(false);
      } else {
        setAppendToBodyStyle({
          position: "absolute",
          top: currentPosition.top + 32,
          left: currentPosition.left - (160 - 32 +1),
        });
        setCheck(false);
      }
    }
    
  }, [appendToBody, appendToBodyStyle, check, isExpand]);

  return (
      <div className="overflow-menu__container" >
        <div
          className={classNames("overflow-menu__button", {
            "overflow-menu__button--md": size === "md",
            "overflow-menu__button--xl": size === "xl",
          })}
          ref={wrapperRef}
        >
          <Button
            type="icon-only-ghost"
            icon={<OverflowMenuVertical16 />}
            className={classNames({
              "btn--md": size === "md",
              "btn--xl": size === "xl",
              "btn--shadow": isExpand,
            })}
            onClick={handleExpand}
          />
        </div>
        {isExpand && (
         <OverflowMenuList setExpand={setExpand} children={children} selectListRef={selectListRef} appendToBodyStyle={appendToBodyStyle}/>
        )}
      </div>
   
  );
}
OverflowMenu.defaultProps = {
  size: "md",
  destroyOnClose: true,
};
export default OverflowMenu;
