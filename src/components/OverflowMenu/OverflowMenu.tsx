import { OverflowMenuVertical16 } from "@carbon/icons-react";
import { ModalProps as AntModalProps } from "antd/lib/modal";
import classNames from "classnames";
import Button from "components/Button";
import React, { ReactNode, RefObject } from "react";
import { CommonService } from "services/common-service";
import "./OverflowMenu.scss";
export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  size?: "md" | "xl";
  appendToBody?: boolean;
}
function OverflowMenu(props: ModalCustomProps) {
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
    if (isExpand && appendToBody && check) {
      const currentPosition = wrapperRef.current.getBoundingClientRect();
      console.log(currentPosition)
      const spaceBelow = window.innerHeight - currentPosition.bottom;
      console.log(spaceBelow)
      if (spaceBelow <= 200) {
        setTimeout(() => {
          const listHeight = selectListRef.current
            ? selectListRef.current.clientHeight
            : 180;
          setAppendToBodyStyle({
            position: "fixed",
            top: currentPosition.top - (listHeight + 30),
            left: currentPosition.right - 160,
            maxWidth: wrapperRef.current.clientWidth,
          });
        }, 100);
        setCheck(false);
      } else {
        setAppendToBodyStyle({
          position: "fixed",
          top: currentPosition.top + wrapperRef.current.clientHeight,
          left: currentPosition.right - 160,
          maxWidth: wrapperRef.current.clientWidth,
        });
        setCheck(false);
      }
    }
    
  }, [appendToBody, appendToBodyStyle, check, isExpand]);

  return (
    <>
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
          <div className="select__list-container" style={appendToBodyStyle}>
            <div
              className="select__list"
              data-floating-menu-direction="bottom"
              onClick={() => setExpand(false)}
              ref={selectListRef}
            >
              <>{children}</>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
OverflowMenu.defaultProps = {
  size: "md",
  destroyOnClose: true,
};
export default OverflowMenu;
