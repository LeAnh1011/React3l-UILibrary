import { Tooltip } from "antd";
import classNames from "classnames";
import { CommonService } from "@Services/common-service";
import Sorter from "../Sorter/Sorter";
import "./LayoutHeader.scss";

export interface LayoutHeaderProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  position?: "left" | "right" | "center";
  title?: string;
  maxLength?: number;
  isSorter?: boolean;
  sortedColumn?: any;
}

function LayoutHeader(props: LayoutHeaderProps) {
  const {
    className,
    orderType,
    title,
    maxLength,
    isSorter,
    sortedColumn,
    position,
  } = props;

  return (
    <button
      className={classNames(
        className,
        `layout-header-${orderType} layout-header__container`
      )}
    >
      <div
        className={classNames(
          "layout-header__title",
          `layout-header__title--${position}`
        )}
      >
        {maxLength && title?.length > maxLength ? (
          <Tooltip title={title}>
            {CommonService.limitWord(title, maxLength)}
          </Tooltip>
        ) : (
          title
        )}
      </div>
      {isSorter && <Sorter sortedColumn={sortedColumn}></Sorter>}
    </button>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
  position: "left",
};
export default LayoutHeader;
