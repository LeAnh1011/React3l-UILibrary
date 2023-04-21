import React from "react";

import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import { BORDER_TYPE } from "./../../../config/enum";
import AdvanceTreeFilter from "./AdvanceTreeFilter";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
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
  { id: 2, name: "Ban công nghệ thông tin", code: "FIM", parentId: 1 },
  { id: 3, name: "Ban nhân sự", code: "FHR", parentId: null },
  { id: 4, name: "Ban truyền thông", code: "FCC", parentId: 2 },
  { id: 5, name: "Ban công nghệ", code: "FTI", parentId: 4 },
  { id: 6, name: "Ban giám đốc", code: "BOD", parentId: 3 },
  {
    id: 7,
    name: "Ban quản trị quản trị quản trị quản trị hệ thống",
    code: "BOM 1",
    parentId: 4,
  },
  { id: 8, name: "Ban quản trị 2", code: "BOM 2", parentId: 4 },
  { id: 9, name: "Ban quản trị 3", code: "BOM 3", parentId: 4 },
  { id: 10, name: "Ban quản trị 4", code: "BOM 4", parentId: 4 },
  { id: 11, name: "Ban quản trị 5", code: "BOM 5", parentId: null },
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
  title: "AdvanceFilter/AdvanceTreeFilter",
  component: AdvanceTreeFilter,
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
    type: {
      control: {
        type: "radio",
        options: [
          BORDER_TYPE.MATERIAL,
          BORDER_TYPE.BORDERED,
          BORDER_TYPE.FLOAT_LABEL,
        ],
      },
      defaultValue: 1,
    },
  },
};

const Template: Story = (args) => {
  const [listItem, dispatch] = React.useReducer(reducerFunc, demoList);

  const [item, setItem] = React.useState<Model>(demoItem);

  const handleChangeItem = React.useCallback((items: Model[], isMultiple) => {
    if (isMultiple) {
      dispatch({ type: "UPDATE_MODEL", data: items });
    } else {
      setItem(items[0]);
    }
  }, []);

  return (
    <div style={{ margin: "10px", width: "1000px" }}>
      <div style={{ margin: "10px", width: "500px" }}>
        <AdvanceTreeFilter
          {...args}
          classFilter={DistrictFilter}
          onChange={handleChangeItem}
          item={item}
          listItem={args?.isMultiple ? listItem : []}
          getTreeData={demoSearchFunc}
          preferOptions={list}
          onlySelectLeaf={true}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
