import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import TreeSelect from "./TreeSelect";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import { IdFilter } from "react3l-advanced-filters";
import { StringFilter } from "react3l-advanced-filters";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import FormItem, { ValidateStatus } from "../FormItem/FormItem";

export class DistrictFilter extends ModelFilter {
  public id: IdFilter = new IdFilter();

  public name: StringFilter = new StringFilter();

  public provinceId: IdFilter = new IdFilter();
}
interface changeAction<T extends Model> {
  type: string;
  data: T[];
}

function reducerFunc(state: Model, action: changeAction<Model>): Model[] {
  switch (action.type) {
    case "UPDATE_MODEL":
      return action.data;
  }
  return;
}

const demoList = [
  { id: 1, name: "Ban hành chính", code: "FAD", parentId: null },
  { id: 2, name: "Ban công nghệ thông tin", code: "FIM", parentId: 1 },
  { id: 3, name: "Ban nhân sự", code: "FHR", parentId: null },
  { id: 4, name: "Ban truyền thông", code: "FCC", parentId: 2 },
  { id: 5, name: "Ban công nghệ", code: "FTI", parentId: 4 },
  { id: 6, name: "Ban giám đốc", code: "BOD", parentId: 3 },
  { id: 7, name: "Ban quản trị", code: "BOM", parentId: 4 },
];

const demoItem = {
  id: 1,
  name: "Ban hành chính",
  code: "FAD",
  parentId: null,
};

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next(demoList);
  }, 500);
});

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

function Default() {
  const [listItem, dispatch] = React.useReducer(reducerFunc, demoList);

  const [item, setItem] = React.useState<Model>(demoItem);

  const [isMultiple, setMultiple] = React.useState(false);

  const [isMaterial, setIsMaterial] = React.useState(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
  }, []);

  const handleChangeRadio = React.useCallback((event: RadioChangeEvent) => {
    if (event.target.value) setItem(undefined);
    else dispatch({ type: "UPDATE_MODEL", data: undefined });
    setMultiple(event.target.value);
  }, []);

  const handleChangeItem = React.useCallback((items: Model[], isMultiple) => {
    if (isMultiple) {
      dispatch({ type: "UPDATE_MODEL", data: items });
    } else {
      setItem(items[0]);
    }
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <TreeSelect
        checkable={isMultiple}
        isMaterial={isMaterial}
        placeHolder={"Select Organization"}
        selectable={!isMultiple}
        classFilter={DistrictFilter}
        onChange={handleChangeItem}
        checkStrictly={true}
        item={item}
        listItem={listItem}
        getTreeData={demoSearchFunc}
      />

      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          message={"Field required!"}
        >
          <TreeSelect
            checkable={isMultiple}
            isMaterial={isMaterial}
            placeHolder={"Select Organization"}
            selectable={!isMultiple}
            classFilter={DistrictFilter}
            onChange={handleChangeItem}
            checkStrictly={true}
            item={item}
            listItem={listItem}
            getTreeData={demoSearchFunc}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeRadio} value={isMultiple}>
          <Radio value={false}>Single</Radio>
          <Radio value={true}>Multiple</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
          <Radio value={true}>Material Style</Radio>
          <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

storiesOf("TreeSelect", module).add(nameof(Default), Default);
