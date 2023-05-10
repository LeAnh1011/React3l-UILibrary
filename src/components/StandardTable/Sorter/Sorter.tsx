import { ArrowUp, ArrowDown } from "@carbon/icons-react";
import classNames from "classnames";
import "./Sorter.scss";

export interface SorterProps {
  sortedColumn?: any;
}

function Sorter(props: SorterProps) {
  const { sortedColumn } = props;

  return (
    <div className="sorter-container">
      {sortedColumn ? (
        sortedColumn.order === "ascend" ? (
          <ArrowUp size={16} className="sort-default" />
        ) : (
          <>
            {sortedColumn.order === "descend" && (
              <ArrowUp size={16} className="sorter-down sort-default" />
            )}
          </>
        )
      ) : null}

      <div className={classNames("sort-action")}>
        <ArrowUp size={16} />
        <ArrowDown size={16} />
      </div>
    </div>
  );
}

export default Sorter;
