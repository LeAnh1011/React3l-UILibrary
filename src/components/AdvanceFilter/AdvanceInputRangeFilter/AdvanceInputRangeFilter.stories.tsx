import { Story } from "@storybook/react";
import React from "react";
import { NumberFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import { BORDER_TYPE } from "../../../config/enum";
import InputNumber from "../../Input/InputNumber";
import AdvanceInputRangeFilter from "./AdvanceInputRangeFilter";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title
} from "@storybook/addon-docs";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export default {
  title: "AdvanceFilter/AdvanceInputRangeFilter",
  component: AdvanceInputRangeFilter,
  subcomponents: {InputNumber},
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
    valueRange: {
      table: {
        category: "InputRangeProps",
      },
    },
    placeHolderRange: {
      defaultValue: ["Từ", "Đến"],
      table: {
        category: "InputRangeProps",
      },
    },
    onChangeRange: {
      table: {
        category: "InputRangeProps",
      },
    },
    label: {
      control: "text",
      defaultValue: "Tổng doanh thu",
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
    },
  }
}

const Template: Story = (args) => {
  const [filter, dispatch] = React.useState<DemoFilter>(new DemoFilter());
  const [numberRange, setNumberRange] = React.useState<[]>([]);

  const handleChangeFilter = React.useCallback((value) => {
    setNumberRange({ ...value });
    dispatch({...filter, number: {lessEqual: value[0], greaterEqual: value[1]}})
  }, [filter]);

  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <div style={{ margin: "10px", width: "250px" }}>
          <AdvanceInputRangeFilter
          {...args}
            valueRange={numberRange}
            onChangeRange={handleChangeFilter}
          />
      </div>
    </div>
  );
}

export const Default = Template.bind({});