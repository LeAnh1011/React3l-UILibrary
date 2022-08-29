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
    sessionId: 1,
    sessionName: "Thông tin chung",
  },
  {
    sessionId: 2,
    sessionName: "Khách hàng",
  },
  {
    sessionId: 3,
    sessionName: "Chiết khấu, quà tặng",
  },
  {
    sessionId: 4,
    sessionName: "Vay",
  },
  {
    sessionId: 5,
    sessionName: "Thanh toán",
  },
  {
    sessionId: 6,
    sessionName: "KhangMeow",
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
        <ProgressIndicator {...args} list={listEnum} />
      </div>
      <div style={{ width: 900 }}>
        <div
          id="frame-1"
          style={{ height: 400, backgroundColor: "red" }}
        >
          {listEnum[0].sessionName}
        </div>
        <div
          id="frame-2"
          style={{ height: 400, backgroundColor: "yellow" }}
        >
          {listEnum[1].sessionName}
        </div>
        <div
          id="frame-3"
          style={{ height: 400, backgroundColor: "blue" }}
        >
          {listEnum[2].sessionName}
        </div>
        <div
          id="frame-4"
          style={{ height: 400, backgroundColor: "green" }}
        >
          {listEnum[3].sessionName}
        </div>
        <div
          id="frame-5"
          style={{ height: 400, backgroundColor: "gray" }}
        >
          {listEnum[4].sessionName}
        </div>
        <div
          id="frame-6"
          style={{ height: 400, backgroundColor: "pink" }}
        >
          {listEnum[5].sessionName}
        </div>
        <div
          style={{ height: 200, backgroundColor: "black" }}
        >
          {'Footer'}
        </div>
      </div>
    </div>
  );
}

export const Default = Template.bind({});
