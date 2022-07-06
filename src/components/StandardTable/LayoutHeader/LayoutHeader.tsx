import { Tooltip } from "antd";
import classNames from "classnames";
import { CommonService } from "services/common-service";
import Sorter from "../Sorter/Sorter";
import "./LayoutHeader.scss";

export interface LayoutHeaderProps {
  className?: string;
  orderType?: "left" | "right" | "center";
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
  } = props;

  return (
    <button
      className={classNames(
        className,
        `layout-header-${orderType} layout-header__container`
      )}
    >
      {maxLength && title?.length > maxLength ? (
        <Tooltip title={title}>
          {CommonService.limitWord(title, maxLength)}
        </Tooltip>
      ) : (
        title
      )}
      {isSorter && <Sorter sortedColumn={sortedColumn}></Sorter>}
    </button>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
