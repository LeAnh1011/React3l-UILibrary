import { IdFilter } from "react3l-advanced-filters";
import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { of } from "rxjs";
import nameof from "ts-nameof.macro";
import FormItem, { ValidateStatus } from "../../FormItem/FormItem";
import Select from "./Select";
import { INPUT_SELECT_TYPE } from "components/Input/InputSelect/InputSelect";

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoListEnum = (TModelFilter: ModelFilter) => {
  return of([
    {
      id: 1,
      name:
        "Option 2 very long one very long one Option 2 very long one very long one",
      code: "E1",
    },
    { id: 2, name: "Enum 2", code: "E2" },
    { id: 3, name: "Enum 3", code: "E3" },
    { id: 4, name: "Enum 4", code: "E4" },
    { id: 5, name: "Enum 5", code: "E5" },
  ]);
};

export function SingleSelectStories() {
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Option 2",
    code: "FAD",
  });

  const [selectModelFilter] = React.useState<DemoFilter>(new DemoFilter());

  const [type, setType] = React.useState<INPUT_SELECT_TYPE>(
    INPUT_SELECT_TYPE.BORDERED
  );

  const [isValidated, setValidated] = React.useState(false);

  const [isSelectWithAdd, setIsSelectWithAdd] = React.useState<boolean>(false);

  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const [
    isSelectWithPreferOption,
    setIsSelectWithPreferOption,
  ] = React.useState<boolean>(false);

  const [isSmall, setIsSmall] = React.useState<boolean>(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setType(event.target.value);
  }, []);

  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);

  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
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

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={isValidated ? "Error label" : ""}
        >
          <Select
            placeHolder={"Select Organization"}
            model={selectModel}
            modelFilter={selectModelFilter}
            searchProperty={nameof(selectModel.name)}
            render={handleRenderModel}
            onChange={handleSetModel}
            getList={demoListEnum}
            classFilter={DemoFilter}
            type={type}
            label={"Label"}
            selectWithAdd={isSelectWithAdd}
            selectWithPreferOption={isSelectWithPreferOption}
            disabled={isDisabled}
            isSmall={isSmall}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={type}>
          <Radio value={INPUT_SELECT_TYPE.MATERIAL}>Material</Radio>
          <Radio value={INPUT_SELECT_TYPE.FLOAT_LABEL}>Float Label</Radio>
          <Radio value={INPUT_SELECT_TYPE.BORDERED}>Bordered</Radio>
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
    </div>
  );
}
