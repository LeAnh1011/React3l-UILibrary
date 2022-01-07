import { storiesOf } from "@storybook/react";
import React from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import InputSearch from "./InputSearch";
import nameof from "ts-nameof.macro";
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

function Default() {
  const [selectModelFilter] = React.useState<DemoFilter>(new DemoFilter());
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Option 2",
    code: "FAD",
  });

  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);

  return (
    <div style={{ width: "400px" }}>
      <InputSearch
        model={selectModel}
        modelFilter={selectModelFilter}
        searchProperty={"name"}
        classFilter={DemoFilter}
        placeHolder="Search..."
        getList={demoListEnum}
        onChange={handleSetModel}
        type="type3"
      />
    </div>
  );
}

storiesOf("InputSearch", module).add(nameof(Default), Default);
