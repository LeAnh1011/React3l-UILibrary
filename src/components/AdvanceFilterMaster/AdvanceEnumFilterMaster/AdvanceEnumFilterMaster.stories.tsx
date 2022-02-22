import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { Reducer } from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "../../../services/advance-filter-service";
import AdvanceEnumFilterMaster from "./AdvanceEnumFilterMaster";
export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoListEnum = [
  {
    id: 1,
    name: "Option 2 very long one very long one ",
    code: "E1",
  },
  { id: 2, name: "Enum 2", code: "E2" },
  { id: 3, name: "Enum 3", code: "E3" },
  { id: 4, name: "Enum 4", code: "E4" },
  { id: 5, name: "Enum 5", code: "E5" },
];

const filterValue = new DemoFilter();
export function AdvanceEnumFilterMasterStories() {
  const [filter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter>>
  >(advanceFilterReducer, filterValue);

  const [id, setValue] = advanceFilterService.useIdFilter<DemoFilter>(
    filter,
    dispatch,
    "id",
    "equal"
  );

  const [multifilter, setFilter] = React.useState(new DemoFilter());
  const handleChangeFilter = React.useCallback(
    (ids) => {
      debugger;
      setFilter({ ...multifilter, id: { in: ids } });
    },
    [multifilter]
  );

  const [isMultiple, setIsMultiple] = React.useState<boolean>(false);

  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
    }
  }, []);

  const handleChangeMultipe = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsMultiple(event.target.value);
      setValue(undefined);
    },
    [setValue]
  );

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <AdvanceEnumFilterMaster
          placeHolder={"Select Enum"}
          value={id}
          listValue={multifilter.id.in}
          render={handleRenderModel}
          onChange={setValue}
          listItem={demoListEnum}
          label={"Label"}
          isMultiple={isMultiple}
          onChangeMultiple={handleChangeFilter} // if type is multiple pass this props
          title="Đơn vị"
        />
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
