import moment from "moment";
import React from "react";
import {
  DateFilter,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import TagFilter from "./TagFilter";

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
  createdAt: DateFilter = new DateFilter();
  updatedAt: DateFilter = new DateFilter();
  total: NumberFilter = new NumberFilter();
  appUserId: IdFilter = new IdFilter();
  organizationId: IdFilter = new IdFilter();
}

export function TagFilterStories() {
  const filterValue = React.useMemo(() => {
    const filterValue = new DemoFilter();
    filterValue.name.contain = "Hương";
    filterValue.total.greaterEqual = 1000;
    filterValue.createdAt.lessEqual = moment().startOf("day");
    filterValue.createdAt.greaterEqual = moment().endOf("day");
    filterValue.updatedAt.equal = moment().subtract(1, "days").startOf("day");
    filterValue.appUserId.equal = 1;
    filterValue.organizationId.in = [1, 4, 5, 6];
    filterValue["organizationValue"] = [
      { id: 1, name: "Ban công nghệ thông tin", code: "FIM" },
      { id: 4, name: "Ban hành chính", code: "FAD" },
      { id: 5, name: "Ban hành chính", code: "FAD" },
      { id: 6, name: "Ban hành chính", code: "FAD" },
    ];
    filterValue["appUserValue"] = {
      id: 1,
      name: "Ban công nghệ thông tin",
      code: "FIM",
    };
    return filterValue;
  }, []);

  const [filter, setFilter] = React.useState<DemoFilter>(filterValue);



  const handleClear = React.useCallback((item) => {
    filter[item?.key] = undefined;
    setFilter({ ...filter });
  }, [filter])
  return (
    <div style={{ margin: "10px", width: "250px" }}>
      <TagFilter value={filter} keyTranslate={"demo"} onClear={handleClear} />
    </div>
  );
}
