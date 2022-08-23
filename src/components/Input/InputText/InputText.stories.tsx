import Apple16 from "@carbon/icons-react/es/apple/16";
import { Story } from "@storybook/react";
import React from "react";
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "./../../../config/enum";
import InputText from "./InputText";


export default {
  title: 'Input/InputText',
  component: InputText,
  subcomponents: { FormItem },
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'First Name'
    },
    maxLength: {
      control: 'number',
      defaultValue: 100,
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

const Template: Story = (args) => {
  const [inputValue, setInputVal] = React.useState();

  const handleChangeValue = React.useCallback((value) => {
    setInputVal(value);
  }, []);

  

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <div style={{ margin: "15px 0" }}>
        <FormItem
          message={"Helper text"}
        >
          <InputText
          {...args}
            prefix={<Apple16 />}
            suffix={<Apple16 />}
            value={inputValue}
            onChange={handleChangeValue}
          />
        </FormItem>
      </div>
    </div>
  );
}


export const Default = Template.bind({});
