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
import { Moment } from "moment";
import React from "react";
import { BORDER_TYPE } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
import DatePicker from "./DatePicker";

export default {
  title: "Calendar/DatePicker",
  component: DatePicker,
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
      table: {
        category: "DatePickerProps",
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
        category: "DatePickerProps",
      },
    },
    value: {
      table: {
        category: "DatePickerProps",
      },
    },
    dateFormat: {
      table: {
        category: "DatePickerProps",
      },
    },
    className: {
      table: {
        category: "DatePickerProps",
      },
    },
    isRequired: {
      table: {
        category: "DatePickerProps",
      },
    },
    isSmall: {
      table: {
        category: "DatePickerProps",
      },
    },
    disabled: {
      table: {
        category: "DatePickerProps",
      },
    },
    placeholder: {
      table: {
        category: "DatePickerProps",
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
    <div style={{ margin: "10px", width: "220px" }}>
      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem
          message={"Helper text"}
        >
          <DatePicker
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