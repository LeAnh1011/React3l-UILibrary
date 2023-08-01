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
import Tabs from "./Tabs";

export default {
  title: "Tabs",
  component: Tabs,
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
    tabErrorKeys: {
      defaultValue: ["tabso1"],
    },
    mode: {
      defaultValue: "line",
    },
    items: {
      defaultValue: [
        { label: "Tab 1", key: "tabso1", children: <>Content of Tab Pane 1</> },
        { label: "Tab 2", key: "tabso2", children: <>Content of Tab Pane 1</> },
        { label: "Tab 3", key: "tabso3", children: <>Content of Tab Pane 1</> },
      ],
    },
  },
};
const Template: Story = (args) => {
  return (
    <>
      <div style={{ margin: "10px", width: "550px" }}>
        <Tabs {...args} />
      </div>
    </>
  );
};

export const Default = Template.bind({});
