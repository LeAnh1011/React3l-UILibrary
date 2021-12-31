import moment, { Moment } from "moment";
import React, { Reducer } from "react";
import {
  DateFilter,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import { AdvanceFilterAction, advanceFilterReducer, advanceFilterService } from "../../../services/advance-filter-service";
import AdvanceIdMultipleFilter from "../../AdvanceFilter/AdvanceIdMultipleFilter/AdvanceIdMultipleFilter";
import AdvanceDateRangFilterMaster from "../AdvanceDateRangFilterMaster/AdvanceDateRangFilterMaster";
import AdvanceIdFilterMaster from "../AdvanceIdFilterMaster/AdvanceIdFilterMaster";
import AdvanceMultipleIdFilterMaster from "../AdvanceMultipleIdFilterMaster/AdvanceMultipleIdFilterMaster";
import TagFilter from "./TagFilter";

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
  createdAt: DateFilter = new DateFilter();
  updatedAt: DateFilter = new DateFilter();
  total: NumberFilter = new NumberFilter();
  appUserId: IdFilter = new IdFilter();
  organizationId: IdFilter = new IdFilter();
}



const orgObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Ban hành chính", code: "FAD" },
      { id: 1, name: "Ban công nghệ thông tin", code: "FIM" },
      { id: 2, name: "Ban nhân sự", code: "FHR" },
      { id: 3, name: "Ban tài chính", code: "FAF" },
      { id: 5, name: "Ban đời sống", code: "DSS" },
      { id: 6, name: "Ban nội vụ", code: "DUH" },
      { id: 7, name: "Ban lao động", code: "FJIP" },
      { id: 8, name: "Ban thể thao", code: "FJUI" },
    ]);
  }, 1000);
});

const appUserObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Lê Đại M", code: "FAD" },
      { id: 1, name: "Nguyễn Văn A", code: "FIM" },
      { id: 2, name: "Bùi Văn V", code: "FHR" },
      { id: 3, name: "Phạm Thị H", code: "FAF" },
    ]);
  }, 1000);
});

const orgSearchFunc = (TModelFilter: ModelFilter) => {
  return orgObservable;
};

const appUserSearchFunc = (TModelFilter: ModelFilter) => {
  return appUserObservable;
};

export function TagFilterStories() {
  const filterValue = React.useMemo(() => {
    const filterValue = new DemoFilter();
    return filterValue;
  }, []);

  const [filter, setFilter] = React.useState<DemoFilter>(filterValue);
  const [item, setItem] = React.useState<any>(null);
  const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);


  const handleChangeOrganization = React.useCallback((id, item) => {
    filter.appUserId.equal = id;
    filter['appUserValue'] = item;
    setFilter({ ...filter });
  }, [filter]);

  const handleChangeFilter = React.useCallback((listItem) => {
    filter.organizationId.in = listItem.map((currentItem) => currentItem.id);
    filter['organizationValue'] = listItem;
    setFilter({ ...filter })
  }, [filter]);

  const handleChange = React.useCallback((item, dateMoment) => {
    filter.createdAt['greaterEqual'] = dateMoment[0];
    filter.createdAt['lessEqual'] = dateMoment[1];
    setItem(item);
    setFilter({ ...filter });
    setValue(dateMoment);
  }, [filter]);



  const handleClear = React.useCallback((item) => {
    filter[item?.key] = {};
    setFilter({ ...filter });
    setItem(null);
    setValue([null, null]);
  }, [filter])
  return (
    <div style={{ margin: "10px", width: "1000px" }}>
      <div style={{ width: "300px" }}>
        <AdvanceIdFilterMaster
          value={filter?.appUserId?.equal}
          placeHolder={"Tìm kiếm..."}
          classFilter={DemoFilter}
          modelFilter={filter}
          searchProperty={'name'}
          onChange={handleChangeOrganization}
          getList={appUserSearchFunc}
          title={'Người vận chuyển'}
        />

        <AdvanceMultipleIdFilterMaster
          values={filter?.organizationId?.in}
          placeHolder={"Tìm kiếm..."}
          classFilter={DemoFilter}
          searchProperty={'name'}
          onChange={handleChangeFilter}
          getList={orgSearchFunc}
          title={'Đơn vị'}
        />

        <AdvanceDateRangFilterMaster
          title={"Ngày giao hàng"}
          onChange={handleChange}
          activeItem={item}
          value={value}
        />
      </div>
      <TagFilter value={filter} keyTranslate={"demo"} onClear={handleClear} />
    </div>
  );
}
