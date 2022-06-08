import { ArrowDown16, ArrowUp16 } from "@carbon/icons-react";
import classNames from "classnames";
import React from "react";
import "./Sorter.scss";

export interface SorterProps {
  sortedColumn?: any;
  isShowAll?: boolean;
}

function Sorter(props: SorterProps) {
  const { sortedColumn, isShowAll = false } = props;

  return (
    <div className="sorter-container">
      {sortedColumn ? (
        sortedColumn.order === "ascend" ? (
          <ArrowUp16 className="sort-default"/>
        ) : (
          <>
            {sortedColumn.order === "descend" && (
              <ArrowUp16 className="sorter-down sort-default" />
            )}
          </>
        )
      ) : null}

      <div
        className={classNames("sort-action", {
          "sort-action__none": !isShowAll,
          "sort-action__block": isShowAll,
        })}
      >
        <ArrowUp16 />
        <ArrowDown16 />
      </div>
    </div>
  );
}

export default Sorter;
