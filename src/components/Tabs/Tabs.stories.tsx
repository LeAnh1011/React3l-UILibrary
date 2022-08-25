import { storiesOf } from "@storybook/react";
import { Radio } from "antd";
import { TabsType } from "antd/lib/tabs";
import React from "react";
import Tabs from "./Tabs";

const { TabPane } = Tabs;

function Default() {
  const [type, setType] = React.useState<TabsType>("line");
  const [errors, setErrors] = React.useState<string[]>([]);
  const handleChangeMode = React.useCallback((event: any) => {
    setType(event?.target?.value);
  }, []);

  const handleChangeErrorTab = React.useCallback((event: any) => {
    const value: string = event?.target?.value;
    if (value) {
      setErrors([value]);
    } else {
      setErrors([]);
    }
  }, []);

  return (
    <>
      <div style={{ margin: "10px", width: "550px" }}>
        <Tabs mode={type} tabErrorKeys={errors}>
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

        <Tabs mode={type}>
          <TabPane tab="Tab 1" key="tabso1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="tabso2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="tabso3" className="ant-tabs-tab__child">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>

      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeMode} value={type}>
          <Radio value={"card"}>Contained</Radio>
          <Radio value={"line"}>Line</Radio>
        </Radio.Group>
        <Radio.Group onChange={handleChangeErrorTab} value={errors[0]}>
          <Radio value={"tabso1"}>Tab 1</Radio>
          <Radio value={"tabso2"}>Tab 2</Radio>
          <Radio value={"tabso3"}>Tab 3</Radio>
          <Radio value={undefined}>None</Radio>
        </Radio.Group>
      </div>
    </>
  );
}

storiesOf("Tabs", module).add("Default", Default);
