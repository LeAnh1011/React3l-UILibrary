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
import { BORDER_TYPE } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
import DateRange from "./DateRange";

export default {
  title: "Calendar/DateRange",
  component: DateRange,
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
      defaultValue: "Ngày tạo",
      table: {
        category: "DateRangeProps",
      },
    },
    type: {
      control: {
        type: "radio",
        options: [
          BORDER_TYPE.MATERIAL,
          BORDER_TYPE.FLOAT_LABEL,
          BORDER_TYPE.BORDERED,
        ],
      },
      defaultValue: 0,
      table: {
        category: "DateRangeProps",
      },
    },
    
  },
};


const Template: Story = (args) => {
  const [value, setValue] = React.useState<[any, any]>([null, null]);

  const handleChange = React.useCallback((dateMoment, dateString) => {
    setValue(dateMoment);
  }, []);

  return (
    <div style={{ margin: "10px", width: "300px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          message={"Helper text"}
        >
          <DateRange
          {...args}
            onChange={handleChange}
            value={value}
          />
        </FormItem>
      </div>
    </div>
  );
}

export const Default = Template.bind({});