import { storiesOf } from "@storybook/react";
import { Radio, Tabs as TabsAnt } from "antd";
import { TabsType } from "antd/lib/tabs";
import React from "react";
import Tabs from "./Tabs";

const { TabPane } = TabsAnt;
function Default() {
  const [type, setType] = React.useState<TabsType>("line");

  const handleChangeMode = React.useCallback((event: any) => {
    setType(event?.target?.value);
  }, []);

  return (
    <>
      <div style={{ margin: "10px", width: "550px" }}>
        <Tabs mode={type} errors={[{key: "tabso1"}]}>
          <TabPane tab="Tab 1" key="tabso1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3" className="ant-tabs-tab__child">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>


        <Tabs mode={type} >
          <TabPane tab="Tab 1" key="tabso2">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3" className="ant-tabs-tab__child">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
      <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeMode} value={type}>
          <Radio value={"card"}>Contained</Radio>
          <Radio value={"line"}>Line</Radio>
        </Radio.Group>
      </div>
    </>
  );
}

storiesOf("Tabs", module).add("Default", Default);
