import { Story } from "@storybook/react";
import { Moment } from "moment";
import React from "react";
import { BORDER_TYPE } from "../../../config/enum";
import AdvanceDateFilter from "./AdvanceDateFilter";
import {
  ArgsTable, Description,
  Primary, CURRENT_SELECTION, Stories, Subtitle, Title
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
          <Description
            children="Type Avatar, có nhiều kiểu, có viền có khung vuông... hiển thị trên
                      currentAvatar, thêm css vào bằng className"
          />
          <Primary />
          <Description
            children="Sử dụng CroppedModal để crop ảnh !!!!"
          />
          <ArgsTable story={CURRENT_SELECTION} showComponent/>
          <Stories/>
          
        </>
      ),
    },
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'First Name',
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    type: {
      control: { type: 'radio', options: [BORDER_TYPE.MATERIAL, BORDER_TYPE.FLOAT_LABEL, BORDER_TYPE.BORDERED] },
      defaultValue: 0,
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    value:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    dateFormat:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    className:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    isRequired:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    isSmall:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    disabled:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    placeholder:  {
      table: {
        category: 'AdvanceDateFilterProps',
      },
    },
    
  },
 
  
} 

const Template: Story = (args) => {

  console.log('args', args)
  const [value, setValue] = React.useState<Moment>();

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);


  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <AdvanceDateFilter
      {...args}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export const Default = Template.bind({});
