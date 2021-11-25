import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { Observable } from "rxjs";
import MultipleSelect from "./MultipleSelect";

const demoList = [
  { id: 1, name: "Ban hành chính", code: "FAD" },
  { id: 2, name: "Ban công nghệ thông tin", code: "FIM" },
  { id: 3, name: "Ban nhân sự", code: "FHR" },
  { id: 4, name: "Ban truyền thông", code: "FCC" },
  { id: 5, name: "Ban công nghệ", code: "FTI" },
  { id: 6, name: "Ban giám đốc", code: "BOD" },
  { id: 7, name: "Ban quản trị", code: "BOM" },
];

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next(demoList);
  }, 1000);
});

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

interface changeAction {
  type: string;
  data: Model;
}

function testReducer(currentState: Model[], action: changeAction): Model[] {
  switch (action.type) {
    case "UPDATE":
      return [...currentState, action.data];
    case "REMOVE":
      const filteredArray = currentState.filter(
        (item) => item.id !== action.data.id
      );
      return [...filteredArray];
  }
  return;
}

class DemoFilter extends ModelFilter {
  public id: IdFilter = new IdFilter();
  public name: StringFilter = new StringFilter();
  public provinceId: IdFilter = new IdFilter();
}

export function MultipleSelectStories() {
  const [models, dispatch] = React.useReducer(testReducer, []);

  const [selectModelFilter] = React.useState<ModelFilter>(new ModelFilter());

  const [isMaterial, setIsMaterial] = React.useState(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
  }, []);

  const handleChangeModels = React.useCallback((item, type) => {
    dispatch({
      type: type,
      data: item,
    });
  }, []);

  return (
    <>
      <div style={{ margin: "10px", width: "300px" }}>
        <MultipleSelect
          models={models}
          placeHolder={"Select Organization"}
          onChange={handleChangeModels}
          getList={demoSearchFunc}
          isMaterial={isMaterial}
          modelFilter={selectModelFilter}
          classFilter={DemoFilter}
        ></MultipleSelect>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
          <Radio value={true}>Material Style</Radio>
          <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </>
  );
}
