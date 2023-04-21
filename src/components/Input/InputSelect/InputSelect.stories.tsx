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
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "./../../../config/enum";
import InputSelect from "./InputSelect";

export default {
  title: "Input/InputSelect",
  component: InputSelect,
  subcomponents: { FormItem },
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
      defaultValue: "First Name",
    },
    placeHolder: {
      control: "text",
      defaultValue: "Enter text",
    },
    type: {
      control: {
        type: "radio",
        options: [
          BORDER_TYPE.MATERIAL,
          BORDER_TYPE.BORDERED,
          BORDER_TYPE.FLOAT_LABEL,
        ],
      },
      defaultValue: 1,
    },
  },
};

const Template: Story = (args) => {
  return (
    <>
      <div style={{ margin: "10px", width: "300px" }}>
        <div style={{ margin: "15px 0" }}>
          <FormItem>
            <InputSelect {...args} />
          </FormItem>
        </div>
      </div>
    </>
  );
};

export const Default = Template.bind({});
