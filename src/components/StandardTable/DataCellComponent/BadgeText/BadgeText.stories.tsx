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
import BadgeText from "./BadgeText";

export default {
  title: "Table/BadgeText",
  component: BadgeText,
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
    value: {
      defaultValue: "Default value"
    },
    backgroundColor: {
      defaultValue: "#d01212"
    },
    color: {
      defaultValue: "#ffffff"
    }
  }
};


const Template: Story = (args) => {

  return (
    <div style={{ width: 'fit-content' }}>
      <BadgeText {...args}></BadgeText>
    </div>
  );
}


export const Default = Template.bind({});
