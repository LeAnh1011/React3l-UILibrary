import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React, { Reducer } from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "../../../services/advance-filter-service";
import AdvanceEnumFilterMaster from "./AdvanceEnumFilterMaster";

class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Ban hành chính", code: "FAD" },
      {
        id: 1,
        name:
          "Ban công nghệ thông tin Ban công nghệ thông tin Ban công nghệ thông tin Ban công nghệ thông tin",
        code: "FIM",
      },
      { id: 2, name: "Ban nhân sự", code: "FHR" },
      { id: 3, name: "Ban tài chính", code: "FAF" },
      { id: 5, name: "Ban đời sống", code: "DSS" },
      { id: 6, name: "Ban nội vụ", code: "DUH" },
      { id: 7, name: "Ban lao động", code: "FJIP" },
      { id: 8, name: "Ban thể thao", code: "FJUI" },
    ]);
  }, 1000);
});

const demoSearchFunc = () => {
  return demoObservable;
};

const filterValue = new DemoFilter();
export default {
  title: "AdvanceFilterMaster/AdvanceEnumFilterMaster",
  component: AdvanceEnumFilterMaster,
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Đơn vị tổ chức",
    },
    placeHolder: {
      defaultValue: "Chọn đơn vị",
    },
  },
};
const Template: Story = (args) => {
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
      setFilter({ ...multifilter, id: { in: ids } });
    },
    [multifilter]
  );

  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
    }
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <AdvanceEnumFilterMaster
          {...args}
          value={id}
          listValue={multifilter.id.in}
          render={handleRenderModel}
          onChange={setValue}
          getList={demoSearchFunc}
          onChangeMultiple={handleChangeFilter} // if type is multiple pass this props
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
