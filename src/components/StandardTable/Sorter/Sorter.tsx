import { ArrowDown16, ArrowUp16 } from "@carbon/icons-react";
import React from "react";

export interface SorterProps {
  sortedColumn?: any;
}

function Sorter(props: SorterProps) {
  const { sortedColumn } = props;



  React.useEffect(() => {
    console.log(sortedColumn)
  }, [sortedColumn]);

  return (
    <div className="sorter-container">
      {sortedColumn ? (
        sortedColumn.order === "ascend" ? (
          <ArrowUp16 />
        ) : (
          <>{sortedColumn.order === "descend" && <ArrowDown16 />}</>
        )
      ) : null}
      <div className="sort-action">
        <ArrowUp16 />
        <ArrowDown16 />
      </div>

    </div>
  );
}

export default Sorter;
