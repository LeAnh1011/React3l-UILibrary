import classNames from "classnames";
import "./LayoutHeader.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";
import Sorter from "../Sorter/Sorter";

export interface LayoutHeaderProps {
  className?: string;
  orderType?: "left" | "right" | "center";
  title?: string;
  maxLength?: number;
  isSorter?: boolean;
  sortedColumn?: any;
}

function LayoutHeader(props: LayoutHeaderProps) {
  const { className, orderType, title, maxLength, isSorter, sortedColumn } = props;
  return (
    <div className={classNames(className, `layout-header-${orderType}`)}>
      {maxLength && title?.length > maxLength ? (
        <Tooltip title={title}>
          {CommonService.limitWord(title, maxLength)}
        </Tooltip>
      ) : (
        title
      )}
      {
        isSorter && <Sorter sortedColumn={sortedColumn}></Sorter>
      }
    </div>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
