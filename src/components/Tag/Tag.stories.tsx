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
import React from "react";
import Tag from "./Tag";

export default {
  title: "Tag",
  component: Tag,
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
    value: {
      defaultValue: "Nguyễn Văn A",
    },
  },
};

const Template: Story = (args) => {
  const handleClickClear = React.useCallback(() => {}, []);
  return (
    <div style={{ width: "fit-content" }}>
      <Tag {...args} action={handleClickClear} />
    </div>
  );
};

export const Default = Template.bind({});
