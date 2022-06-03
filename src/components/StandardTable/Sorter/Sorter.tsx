import { ArrowDown20, ArrowUp20 } from "@carbon/icons-react";
import React from "react";

export interface SorterProps {
  sortedColumn?: any;
}

function Sorter(props: SorterProps) {
  const { sortedColumn } = props;

  const ref = React.useRef(null);


  React.useEffect(()=>{
    console.log(ref)
  },[ref]);

  return (
    <div className="sorter-container" ref={ref}>
      {sortedColumn ? (
        sortedColumn.order === "ascend" ? (
          <ArrowUp20 />
        ) : (
          <ArrowDown20 />
        )
      ) : null}
    </div>
  );
}

export default Sorter;
