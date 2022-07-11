import React from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import InputSearch from "./InputSearch";
import { Observable, of } from "rxjs";

export class Demo extends Model {
  id: number;
  name: string;
  code: string;
}

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}
const demoListEnum = (TModelFilter?: ModelFilter): Observable<Demo[]> => {
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
  const [selectModel, setSelectModel] = React.useState<Model>({});
  const [value, setValue] = React.useState<String>("hello");

  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);

  const handleSearchChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <>
      <div
        style={{
          width: "400px",
          marginTop: 30,
          height: 500,
        }}
      >
        <InputSearch
          classFilter={DemoFilter}
          placeHolder="Search..."
          onChange={handleSearchChange}
          className="m-b--xl"
        />

        <InputSearch
          valueFilter={selectModelFilter}
          searchProperty={"name"}
          classFilter={DemoFilter}
          placeHolder="Search..."
          getList={demoListEnum}
          onChangeSearchField={handleSetModel}
          className="m-b--xl"
        />

        <InputSearch
          valueFilter={selectModelFilter}
          searchProperty={"name"}
          classFilter={DemoFilter}
          placeHolder="Search..."
          getList={demoListEnum}
          onChangeSearchField={handleSetModel}
          animationInput={false}
        />
      </div>
    </>
  );
}
