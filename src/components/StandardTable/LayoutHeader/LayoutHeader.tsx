import { Tooltip } from "antd";
import classNames from "classnames";
import React, {
  useCallback, useState
} from "react";
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

  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    
    if(typeof sortedColumn === undefined) {
      setIsShowAll(false)
    }else {
      if(sortedColumn?.order === 'descend') {
        setIsShowAll(true);
      }else {
        setIsShowAll(false)
      }
    }
  }, [sortedColumn]);


  return (
    <button
      className={classNames(
        className,
        `layout-header-${orderType} layout-header__container`
      )}
      onClick={handleClick}
    >
      {maxLength && title?.length > maxLength ? (
        <Tooltip title={title}>
          {CommonService.limitWord(title, maxLength)}
        </Tooltip>
      ) : (
        title
      )}
      {isSorter && <Sorter sortedColumn={sortedColumn} isShowAll={isShowAll}></Sorter>}
    </button>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
