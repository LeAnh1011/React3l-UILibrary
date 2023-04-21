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

const { TabPane } = Tabs;

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
    mode: {},
  },
};
const Template: Story = (args) => {
  return (
    <>
      <div style={{ margin: "10px", width: "550px" }}>
        <Tabs {...args}>
          <TabPane tab="Tab 1" key={"tabso1"}>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key={"tabso2"}>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key={"tabso3"} className="ant-tabs-tab__child">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>

        <Tabs {...args}>
          <TabPane tab="Tab 1" key="tabso1">
            Content of Tab Pane 1
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export const Default = Template.bind({});
