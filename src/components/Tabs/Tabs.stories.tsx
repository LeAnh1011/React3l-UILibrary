import { storiesOf } from "@storybook/react";
import { Radio } from "antd";
import { TabsType } from "antd/lib/tabs";
import React from "react";
import Tabs from "./Tabs";

function Default() {
  const [type, setType] = React.useState<TabsType>("line");

  const handleChangeMode = React.useCallback((event: any)=>{
    setType(event?.target?.value);
  },[])
  return (
    <>
      <div style={{ margin: "10px", width: "550px" }}>
        <Tabs mode={type}></Tabs>
     </div>
     <div style={{ margin: "10px", width: "400px" }}>
        <Radio.Group onChange={handleChangeMode} value={type}>
          <Radio value={'card'}>Contained</Radio>
          <Radio value={'line'}>Line</Radio>
        </Radio.Group>
      </div>
    </>
  );
}

storiesOf("Tabs", module).add("Default", Default);
