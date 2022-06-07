import classNames from "classnames";
import "./LayoutHeader.scss";
import { Tooltip } from "antd";
import { CommonService } from "services/common-service";
import Sorter from "../Sorter/Sorter";
import React, { MouseEventHandler, RefObject, useCallback, useEffect, useState } from "react";

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

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  const handleMouseOver = useCallback(() => {
    console.log("handleMouseOver");
  }, []);

  const handleMouseMove = useCallback(() => {
    console.log("handleMouseMove");
  }, []);

  const handleClick = useCallback(() => {
    console.log(sortedColumn)
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
    <div
      className={classNames(
        className,
        `layout-header-${orderType} layout-header__container`
      )}
      onClick={handleClick}
      ref={selectListRef}
    >
      {maxLength && title?.length > maxLength ? (
        <Tooltip title={title}>
          {CommonService.limitWord(title, maxLength)}
        </Tooltip>
      ) : (
        title
      )}
      {isSorter && <Sorter sortedColumn={sortedColumn} isShowAll={isShowAll}></Sorter>}
    </div>
  );
}
LayoutHeader.defaultProps = {
  orderType: "left",
};
export default LayoutHeader;
