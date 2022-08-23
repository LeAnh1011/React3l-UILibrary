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
  title: 'Input/InputRange',
  component: InputRange,
  subcomponents: { FormItem },
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'First Name'
    },
    placeHolderRange: {
      defaultValue: ['From', 'To']
    },
    type: {
      control: { type: 'radio', options: [BORDER_TYPE.MATERIAL, BORDER_TYPE.FLOAT_LABEL, BORDER_TYPE.BORDERED] },
      defaultValue: 0
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
        <FormItem message={"Field required!"}>
          <InputRange
            valueRange={numberRange}
            onChangeRange={handleChangeFilter}
            {...args}
          />
        </FormItem>
      </div>
    </div>
  );
}


export const Default = Template.bind({});