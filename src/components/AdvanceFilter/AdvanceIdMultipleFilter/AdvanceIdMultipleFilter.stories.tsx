import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { Observable } from "rxjs";
import AdvanceIdMultipleFilter from "./AdvanceIdMultipleFilter";
import FormItem from "../../FormItem/FormItem";
import { ValidateStatus } from "./../../../config/enum";
import { BORDER_TYPE } from "./../../../config/enum";

const demoList = [
  { id: 1, name: "Ban hành chính", code: "FAD" },
  { id: 2, name: "Ban công nghệ thông tin", code: "FIM" },
  { id: 3, name: "Ban nhân sự", code: "FHR" },
  { id: 4, name: "Ban truyền thông", code: "FCC" },
  { id: 5, name: "Ban công nghệ", code: "FTI" },
  { id: 6, name: "Ban giám đốc", code: "BOD" },
  { id: 7, name: "Ban quản trị", code: "BOM" },
];

const list = [
  { id: 9, name: "Phòng Muti Media", code: "MEDIA" },
  { id: 10, name: "Phòng truyền thông", code: "PTT" },
];

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next(demoList);
  }, 1000);
});

const demoSearchFunc = (TModelFilter?: ModelFilter) => {
  return demoObservable;
};

class DemoFilter extends ModelFilter {
  public id: IdFilter = new IdFilter();
  public name: StringFilter = new StringFilter();
  public provinceId: IdFilter = new IdFilter();
}

export function AdvanceIdMultipleFilterStories() {
  const [selectModelFilter] = React.useState<DemoFilter>(new DemoFilter());

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);
  const [isSmall, setIsSmall] = React.useState<boolean>(false);

  const [isValidated, setValidated] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState(new DemoFilter());
  const [models, setModels] = React.useState<any[]>([]);
  const [
    isSelectWithPreferOption,
    setIsSelectWithPreferOption,
  ] = React.useState<boolean>(false);

  const [isSelectWithAdd, setIsSelectWithAdd] = React.useState<boolean>(false);

  const [withSearch, setWithSearch] = React.useState(true);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleChangeModels = React.useCallback(
    (listItemm, ids) => {
      setModels([...listItemm]);
      setFilter({ ...filter, id: { in: ids } });
    },
    [filter]
  );

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const handleChangeValidated = React.useCallback((event: RadioChangeEvent) => {
    setValidated(event.target.value);
  }, []);

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
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

  const handleChangeWithSearch = React.useCallback(
    (event: RadioChangeEvent) => {
      setWithSearch(event.target.value);
    },
    []
  );

  return (
    <>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={isValidated ? "Error label" : ""}
        >
          <AdvanceIdMultipleFilter
            values={models}
            placeHolder={"Select an option"}
            onChange={handleChangeModels}
            getList={demoSearchFunc}
            valueFilter={selectModelFilter}
            classFilter={DemoFilter}
            label={"Label"}
            type={type}
            isSmall={isSmall}
            disabled={isDisabled}
            selectWithAdd={() => {}}
            isUsingSearch={withSearch}
            preferOptions={isSelectWithPreferOption ? list : undefined}
          ></AdvanceIdMultipleFilter>
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={BORDER_TYPE.MATERIAL}>Material</Radio>
          <Radio value={BORDER_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={BORDER_TYPE.BORDERED}>Bordered</Radio>
        </Radio.Group>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
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
        <Radio.Group onChange={handleChangeWithSearch} value={withSearch}>
          <Radio value={true}>Using Search</Radio>
          <Radio value={false}>Not Using Search</Radio>
        </Radio.Group>
      </div>
    </>
  );
}
