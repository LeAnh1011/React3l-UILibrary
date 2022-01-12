import React from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import InputSearch from "./InputSearch";
import { of } from "rxjs";

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}
const demoListEnum = (TModelFilter: ModelFilter) => {
  return of([
    {
      id: 1,
      name: "Option 2 very long one",
      code: "E1",
    },
    { id: 2, name: "Enum 2", code: "E2" },
    { id: 3, name: "Enum 3", code: "E3" },
    { id: 4, name: "Enum 4", code: "E4" },
    { id: 5, name: "Enum 5", code: "E5" },
  ]);
};

export function InputSearchStories() {
  const [selectModelFilter] = React.useState<DemoFilter>(new DemoFilter());
  const [selectModel, setSelectModel] = React.useState<Model>(null);

  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);

  return (
    <>
      <div
        style={{
          width: "400px",
          marginTop: 30,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <InputSearch
          model={selectModel}
          modelFilter={selectModelFilter}
          searchProperty={"name"}
          classFilter={DemoFilter}
          placeHolder="Search..."
          getList={demoListEnum}
          onChange={handleSetModel}
        />
        <InputSearch
          model={selectModel}
          modelFilter={selectModelFilter}
          searchProperty={"name"}
          classFilter={DemoFilter}
          placeHolder="Search..."
          getList={demoListEnum}
          onChange={handleSetModel}
        />
        <InputSearch
          model={selectModel}
          modelFilter={selectModelFilter}
          searchProperty={"name"}
          classFilter={DemoFilter}
          placeHolder="Search..."
          getList={demoListEnum}
          onChange={handleSetModel}
        />
      </div>
    </>
  );
}
