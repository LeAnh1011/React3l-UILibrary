import React, { Reducer } from "react";
import nameof from "ts-nameof.macro";
import { Observable } from "rxjs";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";

import {
  advanceFilterService,
  advanceFilterReducer,
  AdvanceFilterAction,
} from "services/advance-filter-service";

import AdvanceIdFilterMaster from './AdvanceIdFilterMaster'



const demoObservable = new Observable<Model[]>((observer) => {
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

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const filterValue = new DemoFilter();
filterValue.id.equal = 1;

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

export function AdvanceIdFilterMasterStories() {
  const [AdvanceIdFilterModelFilter] = React.useState<ModelFilter>(
    new ModelFilter(),
  );

  const [filter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter>>
  >(advanceFilterReducer, filterValue);

  const [id, setValue] = advanceFilterService.useIdFilter<DemoFilter>(
    filter,
    dispatch,
    "id",
    "equal",
  );

  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
    }
  }, []);

  React.useEffect(() => { }, [filter]);

  return (
    <div style={{ margin: "10px", width: "250px" }}>
      <AdvanceIdFilterMaster
        placeHolder={"AdvanceIdFilter Organization"}
        value={id}
        classFilter={DemoFilter}
        modelFilter={AdvanceIdFilterModelFilter}
        searchProperty={nameof(DemoFilter.name)}
        render={handleRenderModel}
        onChange={setValue}
        getList={demoSearchFunc}
        title={'Organization'}
      />
    </div>
  );
}
