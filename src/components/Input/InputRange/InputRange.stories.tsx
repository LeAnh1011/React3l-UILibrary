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
import { NumberFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l-common";
import { BORDER_TYPE } from "../../../config/enum";
import FormItem from "../../FormItem/FormItem";
import InputRange from "./InputRange";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export default {
  title: "Input/InputRange",
  component: InputRange,
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
    },
    placeHolderRange: {
      defaultValue: ["From", "To"],
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
    isRequired: {
      description: "Show symbol * as required field",
    },
    value: {
      description: "Prop of InputNumber Component",
    },
    prefix: {
      description: "Prop of InputNumber Component",
    },
    suffix: {
      description: "Prop of InputNumber Component",
    },
    allowPositive: {
      description: "Allow values to be negative not",
    },
    numberType: {
      description: "Provide an option set decimal number type for value",
    },

    isReverseSymb: {
      description: "Reverse symbol “.” and “,”",
    },
    decimalDigit: {
      description: "Provide a length of number behind the point (character)",
    },
    placeHolder: {
      description: "Prop of InputNumber Component",
    },
    disabled: {
      description: "Not allow to handle change values",
    },
    className: {
      description: "Use to custom style the component",
    },
    min: {
      description: "Min of the value number",
    },
    max: {
      description: "Max of the value number",
    },
    action: {
      description: "Prop of InputNumber Component",
    },
    onChange: {
      description: "Prop of InputNumber Component",
    },
    onEnter: {
      description: "Prop of InputNumber Component",
    },
    onBlur: {
      description: "Prop of InputNumber Component",
    },
  },
};

const Template: Story = (args) => {
  const [filter, dispatch] = React.useState<DemoFilter>(new DemoFilter());
  const [numberRange, setNumberRange] = React.useState<[]>([]);

  const handleChangeFilter = React.useCallback(
    (value) => {
      setNumberRange({ ...value });
      dispatch({
        ...filter,
        number: { lessEqual: value[0], greaterEqual: value[1] },
      });
    },
    [filter]
  );

  return (
    <div style={{ width: "250px", margin: "10px" }}>
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem>
          <InputRange
            valueRange={numberRange}
            onChangeRange={handleChangeFilter}
            {...args}
          />
        </FormItem>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
