import React from "react";

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
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import AdvanceTreeFilterMaster from "./AdvanceTreeFilterMaster";
import { Radio, RadioChangeEvent } from "antd";
class DistrictFilter extends ModelFilter {
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
  return [...action.data];
}

const demoList = [
  { id: 1, name: "Ban hành chính", code: "FAD", parentId: null },
  {
    id: 2,
    name: "Ban công nghệ thông tinBan công nghệ thông tin",
    code: "FIM",
    parentId: 1,
  },
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

const demoSearchFunc = (TModelFilter?: ModelFilter) => {
  return demoObservable;
};

export default {
  title: "AdvanceFilterMaster/AdvanceTreeFilterMaster",
  component: AdvanceTreeFilterMaster,
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

    maxLength: {
      defaultValue: 200,
    },
    maxLengthItem: {
      defaultValue: 30,
    },
  },
};

const Template: Story = (args) => {
  const [listItem, dispatch] = React.useReducer(reducerFunc, demoList);

  const [item, setItem] = React.useState<Model>(demoItem);

  const [isMultiple, setMultiple] = React.useState(false);

  const handleChangeRadio = React.useCallback((event: RadioChangeEvent) => {
    if (event.target.value) setItem(new Model());
    else dispatch({ type: "UPDATE_MODEL", data: [] });
    setMultiple(event.target.value);
  }, []);

  const handleChangeItem = React.useCallback((items: Model[], isMultiple) => {
    // eslint-disable-next-line no-debugger
    debugger
    if (isMultiple) {
      dispatch({ type: "UPDATE_MODEL", data: items });
    } else {
      setItem(items[0]);
    }
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <AdvanceTreeFilterMaster
          {...args}
          classFilter={DistrictFilter}
          onChange={handleChangeItem}
          item={isMultiple ? undefined : item}
          listItem={isMultiple ? listItem : []}
          checkable={isMultiple}
          selectable={!isMultiple}
          getTreeData={demoSearchFunc}
          preferOptions={args?.isSelectWithPreferOption ? list : undefined}
          render={(t) => t?.code}
        />
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeRadio} value={isMultiple}>
          <Radio value={false}>Single</Radio>
          <Radio value={true}>Multiple</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
