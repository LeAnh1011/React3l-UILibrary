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
import InputText from "../Input/InputText/InputText";
import FormItem from "./FormItem";
export default {
  title: "FormItem",
  component: FormItem,
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
  argTypes: {},
};

const Template: Story = (args) => {
  return (
    <>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem {...args}>
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem {...args}>
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem {...args}>
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem {...args}>
          <InputText placeHolder={"Enter text..."} />
        </FormItem>
      </div>
    </>
  );
};
export const Default = Template.bind({});
