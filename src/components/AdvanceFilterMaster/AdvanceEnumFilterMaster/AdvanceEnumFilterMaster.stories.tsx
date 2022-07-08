import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { Reducer } from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService
} from "../../../services/advance-filter-service";
import AdvanceEnumFilterMaster from "./AdvanceEnumFilterMaster";
export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Ban hành chính", code: "FAD" },
      {
        id: 1,
        name:
          "Ban công nghệ thông tin Ban công nghệ thông tin Ban công nghệ thông tin Ban công nghệ thông tin",
        code: "FIM",
      },
      { id: 2, name: "Ban nhân sự", code: "FHR" },
      { id: 3, name: "Ban tài chính", code: "FAF" },
      { id: 5, name: "Ban đời sống", code: "DSS" },
      { id: 6, name: "Ban nội vụ", code: "DUH" },
      { id: 7, name: "Ban lao động", code: "FJIP" },
      { id: 8, name: "Ban thể thao", code: "FJUI" },
    ]);
  }, 1000);
});

const demoSearchFunc = () => {
  return demoObservable;
};

const filterValue = new DemoFilter();
export function AdvanceEnumFilterMasterStories() {
  const [filter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter>>
  >(advanceFilterReducer, filterValue);

  const [id, setValue] = advanceFilterService.useIdFilter<DemoFilter>(
    filter,
    dispatch,
    "id",
    "equal"
  );

  const [multifilter, setFilter] = React.useState(new DemoFilter());
  const handleChangeFilter = React.useCallback(
    (ids) => {
      setFilter({ ...multifilter, id: { in: ids } });
    },
    [multifilter]
  );

  const [isMultiple, setIsMultiple] = React.useState<boolean>(false);

  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
    }
  }, []);

  const handleChangeMultipe = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsMultiple(event.target.value);
      setValue(undefined);
    },
    [setValue]
  );

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <AdvanceEnumFilterMaster
          placeHolder={"Select Enum"}
          value={id}
          listValue={multifilter.id.in}
          render={handleRenderModel}
          onChange={setValue}
          getList={demoSearchFunc}
          label={"Label"}
          isMultiple={isMultiple}
          onChangeMultiple={handleChangeFilter} // if type is multiple pass this props
          title="Đơn vị"
        />
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeMultipe} value={isMultiple}>
          <Radio value={true}>Multiple</Radio>
          <Radio value={false}>Single</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
