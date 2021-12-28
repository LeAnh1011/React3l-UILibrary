import React from "react";
import { storiesOf } from "@storybook/react";
import TreeSelect from "./TreeSelect";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import { IdFilter } from "react3l-advanced-filters";
import { StringFilter } from "react3l-advanced-filters";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import FormItem from "../FormItem/FormItem";
import { BORDER_TYPE } from "./../../config/enum";
import { ValidateStatus } from "./../../config/enum";

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

const list = [
  { id: 9, name: "Phòng Muti Media", code: "MEDIA", parentId: null },
  { id: 10, name: "Phòng truyền thông", code: "PTT", parentId: 9 },
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

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);

  const [isSmall, setIsSmall] = React.useState<boolean>(false);

  const [isValidated, setValidated] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const [
    isSelectWithPreferOption,
    setIsSelectWithPreferOption,
  ] = React.useState<boolean>(false);

  const [isSelectWithAdd, setIsSelectWithAdd] = React.useState<boolean>(false);

  const [withSearch, setWithSearch] = React.useState(true);

  const handleChangeType = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
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

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChangeSelectWithAdd = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsSelectWithAdd(event.target.value);
    },
    []
  );

  const handleChangeSelectWithPreferOption = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsSelectWithPreferOption(event.target.value);
    },
    []
  );

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const handleChangeWithSearch = React.useCallback(
    (event: RadioChangeEvent) => {
      setWithSearch(event.target.value);
    },
    []
  );

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={isValidated ? "Error label" : ""}
        >
          <TreeSelect
            checkable={isMultiple}
            placeHolder={"Select Organization"}
            selectable={!isMultiple}
            classFilter={DistrictFilter}
            onChange={handleChangeItem}
            checkStrictly={true}
            item={item}
            listItem={isMultiple ? listItem : []}
            getTreeData={demoSearchFunc}
            type={type}
            isUsingSearch={withSearch}
            label={"Label"}
            disabled={isDisabled}
            isSmall={isSmall}
            selectWithAdd={isSelectWithAdd}
            selectWithPreferOption={isSelectWithPreferOption}
            preferOptions={isSelectWithPreferOption ? list : undefined}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={isValidated ? "Error label" : ""}
        >
          <TreeSelect
            checkable={isMultiple}
            placeHolder={"Select Organization"}
            selectable={!isMultiple}
            classFilter={DistrictFilter}
            onChange={handleChangeItem}
            checkStrictly={true}
            item={item}
            listItem={isMultiple ? listItem : []}
            getTreeData={demoSearchFunc}
            type={type}
            isUsingSearch={withSearch}
            label={"Label"}
            disabled={isDisabled}
            isSmall={isSmall}
            selectWithAdd={isSelectWithAdd}
            selectWithPreferOption={isSelectWithPreferOption}
            preferOptions={isSelectWithPreferOption ? list : undefined}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeRadio} value={isMultiple}>
          <Radio value={false}>Single</Radio>
          <Radio value={true}>Multiple</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeType} value={type}>
          <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeValidated} value={isValidated}>
          <Radio value={true}>Validated</Radio>
          <Radio value={false}>Not Validated</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeDisabled} value={isDisabled}>
          <Radio value={true}>Disabled</Radio>
          <Radio value={false}>Not Disabled</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group
          onChange={handleChangeSelectWithAdd}
          value={isSelectWithAdd}
        >
          <Radio value={true}>Select with add</Radio>
          <Radio value={false}>Not select with add</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "800px" }}>
        <Radio.Group
          onChange={handleChangeSelectWithPreferOption}
          value={isSelectWithPreferOption}
        >
          <Radio value={true}>Select with prefer option</Radio>
          <Radio value={false}>Not select with prefer option</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
      </div>
      {isMultiple && (
        <div style={{ margin: "10px", width: "300px" }}>
          <Radio.Group onChange={handleChangeWithSearch} value={withSearch}>
            <Radio value={true}>Using Search</Radio>
            <Radio value={false}>Not Using Search</Radio>
          </Radio.Group>
        </div>
      )}
    </div>
  );
}

storiesOf("TreeSelect", module).add("Default", Default);
