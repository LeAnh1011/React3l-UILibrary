import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React from "react";
import OverflowMenu from "./OverflowMenu";
import OverflowMenuList from "./OverflowMenuList";
enum SIZE_TYPE {
  LARGE = "xl",
  MEDIUM = "md",
}

export default {
  title: "OverflowMenu",
  component: OverflowMenu,
  subcomponents: {OverflowMenuList},
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
    size: {
      control: {
        type: "radio",
        options: [
          SIZE_TYPE.LARGE,
          SIZE_TYPE.MEDIUM,
        ],
      },
      defaultValue: SIZE_TYPE.LARGE,
    },
   
  },
};


const Template: Story = (args) => {

  const handleAdd = React.useCallback(() => {}, []);

  const handleEdit = React.useCallback(() => {}, []);

  const handleDelete = React.useCallback(() => {}, []);

  const list = [
    {
      name: "Thêm",
      action: handleAdd,
    },
    {
      name: "Sửa",
      action: handleEdit,
    },
    {
      name: "Xóa",
      action: handleDelete,
    },
  ];


  return (
    <div style={{ width: "600px" }}>
      <OverflowMenu {...args} list={list}></OverflowMenu>
    </div>
  );
}


export const Default = Template.bind({});
