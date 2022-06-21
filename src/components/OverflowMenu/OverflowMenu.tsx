import { OverflowMenuVertical16, TrashCan16 } from "@carbon/icons-react";
import { ModalProps as AntModalProps } from "antd/lib/modal";
import classNames from "classnames";
import Button from "components/Button";
import IconLoading from "components/IconLoading";
import React, { ReactNode, RefObject } from "react";
import "./OverflowMenu.scss";
export interface ModalCustomProps extends AntModalProps {
  children?: ReactNode;
  size?: "md" | "xl";
}
function OverflowMenu(props: ModalCustomProps) {
  const { size, children } = props;

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const [appendToBodyStyle, setAppendToBodyStyle] = React.useState({});

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleExpand = React.useCallback(() => {
    setExpand(true);
    console.log(selectListRef.current?.firstChild);
    setTimeout(() => {
      const element = selectListRef.current?.firstChild as HTMLElement;
      element.focus();
    }, 300);
  }, []);

  console.log(selectListRef.current)

  return (
    <>
      <div className="overflow-menu__container">
        <div className={classNames("overflow-menu__button", {
          "overflow-menu__button--md": size === "md",
          "overflow-menu__button--xl": size === "xl",
        })}>
          <Button
            type="icon-only-ghost"
            icon={<OverflowMenuVertical16 />}
            className={classNames({
              "btn--md": size === "md",
              "btn--xl": size === "xl",
            })}
            onClick={handleExpand}
          />
        </div>
        {isExpand && (
          <div className="select__list-container" style={appendToBodyStyle}>

            {!loading ? (
              <div
                className="select__list"
                data-floating-menu-direction="bottom"
                onClick={() => setExpand(false)}
                ref={selectListRef}
              >
                <>{children}</>
              </div>

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
  size: "md",
  destroyOnClose: true,
};
export default OverflowMenu;
