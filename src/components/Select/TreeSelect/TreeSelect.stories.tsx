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
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { IdFilter, StringFilter } from "react3l-advanced-filters";
import { Model, ModelFilter } from "react3l-common";
import { Observable } from "rxjs";
import { BORDER_TYPE } from "./../../../config/enum";
import FormItem from "./../../FormItem/FormItem";
import TreeSelect from "./TreeSelect";

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

export default {
  title: "Select/TreeSelect",
  component: TreeSelect,
  subcomponents: { FormItem },
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
    maxLengthItem: {
      defaultValue: 30,
    },
  },
};
const demoList: any = [
  {
    id: 274,
    masterEntityId: 2,
    entityId: 274,
    code: "TT4",
    name: "Trung tâm 4",
    statusId: 1,
    path: "1.217.218.274.",
    level: 4,
    hasChildren: false,
    parentId: 218,
    createdAt: "2021-10-20T04:22:35.303Z",
    updatedAt: "2021-10-20T04:22:35.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 272,
    masterEntityId: 2,
    entityId: 272,
    code: "R&D",
    name: "Trung tâm R&D",
    statusId: 1,
    path: "1.272.",
    level: 2,
    hasChildren: false,
    parentId: 1,
    createdAt: "2021-07-28T08:32:18.673Z",
    updatedAt: "2021-07-28T08:32:18.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 268,
    masterEntityId: 2,
    entityId: 268,
    code: "KDDVCS",
    name: "Trung tâm KD và DV chiếu sáng HN",
    statusId: 1,
    path: "1.268.",
    level: 2,
    hasChildren: false,
    parentId: 1,
    createdAt: "2021-04-23T11:03:11.220Z",
    updatedAt: "2021-04-23T11:03:11.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 266,
    masterEntityId: 2,
    entityId: 266,
    code: "TT3",
    name: "Trung tâm 3",
    statusId: 1,
    path: "1.217.218.266.",
    level: 4,
    hasChildren: false,
    parentId: 218,
    createdAt: "2021-04-13T09:39:25.263Z",
    updatedAt: "2021-04-13T09:39:25.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 265,
    masterEntityId: 2,
    entityId: 265,
    code: "TT2",
    name: "Trung tâm 2",
    statusId: 1,
    path: "1.217.218.265.",
    level: 4,
    hasChildren: false,
    parentId: 218,
    createdAt: "2021-04-13T09:39:08.013Z",
    updatedAt: "2021-04-13T09:39:08.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 264,
    masterEntityId: 2,
    entityId: 264,
    code: "TT1",
    name: "Trung tâm 1",
    statusId: 1,
    path: "1.217.213.264.",
    level: 4,
    hasChildren: false,
    parentId: 213,
    createdAt: "2021-04-13T09:38:42.453Z",
    updatedAt: "2021-04-13T09:38:42.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 263,
    masterEntityId: 2,
    entityId: 263,
    code: "TT",
    name: "Truyền thông",
    statusId: 1,
    path: "1.263.",
    level: 2,
    hasChildren: false,
    parentId: 1,
    createdAt: "2021-03-26T10:17:21.680Z",
    updatedAt: "2021-03-26T10:17:21.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 261,
    masterEntityId: 2,
    entityId: 261,
    code: "QTHT",
    name: "Quản trị hệ thống",
    statusId: 1,
    path: "1.261.",
    level: 2,
    hasChildren: false,
    parentId: 1,
    createdAt: "2021-03-24T09:19:01.310Z",
    updatedAt: "2021-03-24T09:19:01.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 228,
    masterEntityId: 2,
    entityId: 228,
    code: "NT",
    name: "Nha Trang",
    statusId: 1,
    path: "1.217.218.228.",
    level: 4,
    hasChildren: false,
    parentId: 218,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-04-15T16:03:51.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 221,
    masterEntityId: 2,
    entityId: 221,
    code: "HGST",
    name: "Hậu Giang, Sóc Trăng",
    statusId: 0,
    path: "1.218.221.",
    level: 3,
    hasChildren: false,
    parentId: 218,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2020-09-20T10:59:12.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 218,
    masterEntityId: 2,
    entityId: 218,
    code: "PPMN",
    name: "Quản lý Bán hàng 2",
    statusId: 1,
    path: "1.217.218.",
    level: 3,
    hasChildren: false,
    parentId: 217,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-03-04T10:08:21.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 217,
    masterEntityId: 2,
    entityId: 217,
    code: "NCTT",
    name: "Nghiên cứu thị trường",
    statusId: 1,
    path: "1.217.",
    level: 2,
    hasChildren: false,
    parentId: 1,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-02-19T10:58:22.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 216,
    masterEntityId: 2,
    entityId: 216,
    code: "TV03",
    name: "Truyền thống Vùng 3",
    statusId: 1,
    path: "1.217.213.216.",
    level: 4,
    hasChildren: false,
    parentId: 213,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-03-04T10:20:12.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 215,
    masterEntityId: 2,
    entityId: 215,
    code: "TV02",
    name: "Truyền thống Vùng 2",
    statusId: 1,
    path: "1.217.213.215.",
    level: 4,
    hasChildren: false,
    parentId: 213,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-03-04T10:18:54.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 214,
    masterEntityId: 2,
    entityId: 214,
    code: "TV01",
    name: "Truyền thống Vùng 1",
    statusId: 1,
    path: "1.217.213.214.",
    level: 4,
    hasChildren: false,
    parentId: 213,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-03-04T10:17:12.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 213,
    masterEntityId: 2,
    entityId: 213,
    code: "PPMB",
    name: "Quản lý Bán hàng 1",
    statusId: 1,
    path: "1.217.213.",
    level: 3,
    hasChildren: false,
    parentId: 217,
    createdAt: "2020-07-06T11:15:29.300Z",
    updatedAt: "2021-03-04T10:08:00.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 19,
    masterEntityId: 2,
    entityId: 19,
    code: "MT",
    name: "Miền Trung",
    statusId: 1,
    path: "1.19.",
    level: 2,
    hasChildren: false,
    parentId: 1,
    createdAt: "2021-04-26T11:51:58.900Z",
    updatedAt: "2021-04-26T11:51:58.900Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
  {
    id: 1,
    masterEntityId: 2,
    entityId: 1,
    code: "RD",
    name: "Công Ty Cổ Phần Bóng Đèn Phích Nước Rạng Đông",
    statusId: 1,
    path: "1.",
    level: 1,
    hasChildren: false,
    parentId: null,
    createdAt: "2020-06-23T17:49:08.420Z",
    updatedAt: "2020-09-29T10:27:53.000Z",
    informations: null,
    warnings: null,
    errors: null,
    disabled: null,
    generalInformations: [],
    generalWarnings: [],
    generalErrors: [],
  },
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

const Template: Story = (args) => {
  const [listItem, dispatch] = React.useReducer(reducerFunc, demoList);

  const [item, setItem] = React.useState<Model>(demoItem);

  const [isMultiple, setMultiple] = React.useState(false);

  const [filter] = React.useState<DistrictFilter>(new DistrictFilter());

  const handleChangeRadio = React.useCallback((event: RadioChangeEvent) => {
    if (event.target.value) setItem(new Model());
    else dispatch({ type: "UPDATE_MODEL", data: [] });
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
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem>
          <TreeSelect
            checkable={isMultiple}
            placeHolder={"Select Organization"}
            selectable={!isMultiple}
            onChange={handleChangeItem}
            item={isMultiple ? undefined : item}
            listItem={isMultiple ? listItem : []}
            getTreeData={demoSearchFunc}
            label={"Label"}
            valueFilter={{ ...filter, id: { equal: 1 } }}
            checkStrictly
          />
        </FormItem>
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
