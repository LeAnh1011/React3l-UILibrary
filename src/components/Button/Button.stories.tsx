import { Story } from "@storybook/react";
import Button from "./Button";
import React from "react";

export default {
  title: "Button",
  component: Button,
  parameters: {
    controls: { expanded: true },
    docs: {
     
    },
  },
  
};
const Template: Story = (args) => {
  return (
    <Button
    {...args}
    className="btn--sm"
  >
    {"Button"}
  </Button>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  primary: false,
};