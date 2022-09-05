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
import { Observable } from "rxjs";
import { Story } from "@storybook/react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";

class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoListEnum = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
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
    ]
    )
  }, 300);
});

const demoSearchFunc = () => {
  return demoListEnum;
};

export default {
  title: "Select/EnumSelect",
  component: EnumSelect,
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
          BORDER_TYPE.FLOAT_LABEL,
          BORDER_TYPE.BORDERED,
        ],
      },
      defaultValue: 0,
    },
  },
};

const Template: Story = (args) => {
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Option 2",
    code: "FAD",
  });

  const [models, setModels] = React.useState<any>([]);

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

  const handleChangeModels = React.useCallback((listItem, ids) => {
    setModels(listItem);
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
        >
          <EnumSelect
          {...args}
            value={selectModel}
            render={handleRenderModel}
            onChange={handleSetModel}
            getList={demoSearchFunc}
            onChangeMultiple={handleChangeModels} // if type is multiple pass this props
            listValue={models} // if type is multiple pass this prop
          />
        </FormItem>
      </div>
    </div>
  );
}

export const Default = Template.bind({});