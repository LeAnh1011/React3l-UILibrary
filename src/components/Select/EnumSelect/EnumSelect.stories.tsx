import { IdFilter } from "react3l-advanced-filters";
import { StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import FormItem from "../../FormItem/FormItem";
import EnumSelect from "./EnumSelect";
import { ValidateStatus } from "./../../../config/enum";
import { BORDER_TYPE } from "./../../../config/enum";

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoListEnum = [
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
];
// interface changeAction {
//   type: string;
//   data: Model;
// }

export function EnumSelectStories() {
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Option 2",
    code: "FAD",
  });

  const [models, setModels] = React.useState([]);

  const [type, setType] = React.useState<BORDER_TYPE>(BORDER_TYPE.BORDERED);

  const [isValidated, setValidated] = React.useState(false);

  const [isSelectWithAdd, setIsSelectWithAdd] = React.useState<boolean>(false);

  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const [isSmall, setIsSmall] = React.useState<boolean>(false);

  const [isMultiple, setIsMultiple] = React.useState<boolean>(false);

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

  const handleChangeDisabled = React.useCallback((event: RadioChangeEvent) => {
    setIsDisabled(event.target.value);
  }, []);

  const handleChangeSize = React.useCallback((event: RadioChangeEvent) => {
    setIsSmall(event.target.value);
  }, []);

  const handleChangeMultipe = React.useCallback((event: RadioChangeEvent) => {
    setIsMultiple(event.target.value);
  }, []);

  const handleChangeModels = React.useCallback((listItem, ids) => {
    setModels([...listItem]);
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          validateStatus={isValidated ? ValidateStatus.error : null}
          message={isValidated ? "Error label" : ""}
        >
          <EnumSelect
            placeHolder={"Select Organization"}
            value={selectModel}
            render={handleRenderModel}
            onChange={handleSetModel}
            listItem={demoListEnum}
            type={type}
            label={"Label"}
            selectWithAdd={isSelectWithAdd}
            disabled={isDisabled}
            isSmall={isSmall}
            isMultiple={isMultiple}
            onChangeMultiple={handleChangeModels} // if type is multiple pass this props
            listValue={models} // if type is multiple pass this prop
          />
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

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSize} value={isSmall}>
          <Radio value={true}>Small</Radio>
          <Radio value={false}>Default</Radio>
        </Radio.Group>
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
