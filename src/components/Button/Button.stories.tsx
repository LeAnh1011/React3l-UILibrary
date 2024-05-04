import { Add } from "@carbon/icons-react";
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary as PrimaryStory,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs";
import { Story } from "@storybook/react";
import React from "react";
import Button from "./Button";
import classNames from "classnames";

export default {
  title: "Button",
  component: Button,
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description children={"test"} />
          <PrimaryStory />
          <Stories includePrimary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
  argTypes: {
    className: {
      control: {
        type: "radio",
        options: [
          "btn--sx",
          "btn--sm",
          "btn--md",
          "btn--lg",
          "btn--xl",
          "btn--2xl",
        ],
      },
      defaultValue: "btn--sm",
      description: "",
    },
    type: {},
    loading: {},
    htmlType: {},
    disabled: {},
    onClick: {},
    icon: {},
  },
};
const Template: Story = (args) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleOnClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div style={{ width: 500 }}>
      <Button
        {...args}
        className={classNames("m-l--2xl", args?.className)}
        icon={<Add size={16} />}
        loading={loading}
        onClick={handleOnClick}
      >
        {"Button"}
      </Button>
      <Button
        {...args}
        className={classNames("m-l--2xl", args?.className)}
        icon={<Add size={16} />}
        loading={loading}
        onClick={handleOnClick}
      >
        {"Button"}
      </Button>
      <Button
        {...args}
        className={classNames("m-l--2xl", args?.className)}
        icon={<Add size={16} />}
        loading={loading}
        onClick={handleOnClick}
      >
        {"Button"}
      </Button>
    </div>
  );
};

export const NormalButton = Template.bind({});
NormalButton.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};

export const Ghost = Template.bind({});
Ghost.args = {
  ...NormalButton.args,
  type: "ghost",
};
Ghost.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};
export const Bleed = Template.bind({});
Bleed.args = {
  ...NormalButton.args,
  type: "bleed-primary",
};
Bleed.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};

export const LinkPlainButton = Template.bind({});
LinkPlainButton.args = {
  ...NormalButton.args,
  type: "link-plain",
};
LinkPlainButton.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};

export const Link = Template.bind({});
Link.args = {
  ...NormalButton.args,
  type: "link",
};
Link.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};

export const IconButton = Template.bind({});
IconButton.args = {
  ...NormalButton.args,
  type: "icon-only-primary",
};
IconButton.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};
