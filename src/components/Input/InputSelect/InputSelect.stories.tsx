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
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'First Name'
    },
    placeHolder: {
      control: 'text',
      defaultValue: 'Enter text'
    },
    type: {
      control: { type: 'radio', options: [BORDER_TYPE.MATERIAL, BORDER_TYPE.FLOAT_LABEL, BORDER_TYPE.BORDERED] },
      defaultValue: 0
    },
   
  }
}

const Template: Story = (args) => {

  return (
    <>
      <div style={{ margin: "10px", width: "300px" }}>
        <div style={{ margin: "15px 0" }}>
          <FormItem
            message={"Helper text"}
          >
            <InputSelect {...args}/>
          </FormItem>
        </div>
      </div>
    </>
  );
}


export const Default = Template.bind({});