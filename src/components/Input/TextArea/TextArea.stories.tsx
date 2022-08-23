import { Story } from "@storybook/react";
import React from "react";
import { BORDER_TYPE } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
import TextArea, { TextAreaProps } from "./TextArea";


export default {
  title: 'Input/TextArea',
  component: TextArea,
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
  },
  
};


const Template: Story = (args: TextAreaProps) => {
  console.log(args)
  const [inputValue, setInputVal] = React.useState();

  const handleChangeValue = React.useCallback((value) => {
    setInputVal(value);
  }, []);

  return (
    <div style={{ width: "244px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message="Helper"
        >
          <TextArea
            {...args}
            label={args.label}
            value={inputValue}
            onChange={handleChangeValue}
          />
        </FormItem>
      </div>
    </div>
  );
}

export const Default = Template.bind({});
