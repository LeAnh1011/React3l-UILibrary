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
};

const Template1: Story = (args) => {
  return (
    <div>
      <div style={{ height: 100 }}> height 100</div>
      <ProgressIndicator
        list={listEnum}
        idContainer={"container-frame"}
        type={"horizontal"}
      />
      <ProgressIndicator.Content
        contentId="container-frame"
        className="m-t--3xl"
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
      </ProgressIndicator.Content>
    </div>
  );
};

const Template2: Story = (args) => {
  return (
    <>
      <div style={{ height: 100 }}> height 100</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 200 }}>
          <ProgressIndicator list={listEnum} idContainer={"container-frame"} />
        </div>
        <ProgressIndicator.Content contentId="container-frame" width={900}>
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
        </ProgressIndicator.Content>
      </div>
    </>
  );
};
export const Horizontal = Template1.bind({});
export const Vertical = Template2.bind({});
