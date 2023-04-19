import AdvanceDateFilter from "./AdvanceDateFilter";
import { Story } from "@storybook/react";
import React from "react";
import { Moment } from "moment";
import { BORDER_TYPE } from "../../../config/enum";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";

export default {
  title: "AdvanceFilter/AdvanceDateFilter",
  component: AdvanceDateFilter,
  subcomponents: { AdvanceDateFilter },
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
    label: {
      control: "text",
      defaultValue: "Ngày nhập kho",
    },
    type: {
      control: {
        type: "radio",
        options: [
          BORDER_TYPE.MATERIAL,
          BORDER_TYPE.BORDERED,
          BORDER_TYPE.FLOAT_LABEL,
        ],
        defaultValue: 1,
      },
    },
  },
};
const Template: Story = (args) => {
  const [value, setValue] = React.useState<Moment>();

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <AdvanceDateFilter {...args} onChange={handleChange} value={value} />
    </div>
  );
};

export const Default = Template.bind({});
