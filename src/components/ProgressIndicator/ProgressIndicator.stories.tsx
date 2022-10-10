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
import ProgressIndicator from "./ProgressIndicator";

const listEnum = [
  {
    sectionId: 1,
    sectionName: "Thông tin chung",
  },
  {
    sectionId: 2,
    sectionName: "Khách hàng",
  },
  {
    sectionId: 3,
    sectionName: "Chiết khấu, quà tặng",
  },
  {
    sectionId: 4,
    sectionName: "Vay",
  },
  {
    sectionId: 5,
    sectionName: "Thanh toán",
  },
  {
    sectionId: 6,
    sectionName: "KhangMeow",
  },
  {
    sectionId: 7,
    sectionName: "TestFrame",
  },
];


export default {
  title: "ProgressIndicator",
  component: ProgressIndicator,
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
}
const Template: Story = (args) => {
  // const [currentId,setCurrentId] = React.useState<number>(1);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 200 }}>
        <ProgressIndicator list={listEnum} idContainer={"container-frame"}/>
      </div>
      <div
        style={{ width: 900, height: 700, overflow: "auto" }}
        id="container-frame"
      >
        <div id="frame-1" style={{ height: 400, backgroundColor: "red" }}>
          {listEnum[0].sectionName}
        </div>
        <div id="frame-2" style={{ height: 400, backgroundColor: "yellow" }}>
          {listEnum[1].sectionName}
        </div>
        <div id="frame-3" style={{ height: 400, backgroundColor: "blue" }}>
          {listEnum[2].sectionName}
        </div>
        <div id="frame-4" style={{ height: 400, backgroundColor: "green" }}>
          {listEnum[3].sectionName}
        </div>
        <div id="frame-5" style={{ height: 400, backgroundColor: "gray" }}>
          {listEnum[4].sectionName}
        </div>
        <div id="frame-6" style={{ height: 400, backgroundColor: "pink" }}>
          {listEnum[5].sectionName}
        </div>
        <div id="frame-7" style={{ height: 200, backgroundColor: "black" }}>
          {listEnum[6].sectionName}
        </div>
      </div>
    </div>
  );
}

export const Default = Template.bind({});
