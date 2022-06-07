import { ArrowDown16, ArrowUp16 } from "@carbon/icons-react";
import React from "react";
import './Sorter.scss';

export interface SorterProps {
  sortedColumn?: any;
  isShowAll?: boolean;

}

function Sorter(props: SorterProps) {
  const { sortedColumn,isShowAll = false } = props;


  return (
    <div className="sorter-container">
      {sortedColumn ? (
        sortedColumn.order === "ascend" ? (
          <ArrowUp16 />
        ) : (
          <>{sortedColumn.order === "descend" && <ArrowUp16  className="sorter-down"/>}</>
        )
      ) : null}
      {
        isShowAll && 
        <div className="sort-action">
        <ArrowUp16 />
        <ArrowDown16 />
      </div> 
      }
      

    </div>
  );
}

export default Sorter;
