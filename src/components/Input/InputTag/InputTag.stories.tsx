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
import { useDebounceFn } from "ahooks";
import React from "react";
import { Model } from "react3l-common";
import { DEBOUNCE_TIME_300 } from "../../../config/consts";
import Button from "../../Button/NormalButton";
import FormItem from "../../FormItem/FormItem";
import { BORDER_TYPE } from "./../../../config/enum";
import InputTag from "./InputTag";

const demoItemList = [
  { id: 1, name: "Tag 1", code: "1" },
  { id: 2, name: "Tag 2", code: "2" },
  { id: 3, name: "Tag 3", code: "3" },
  { id: 4, name: "Tag 3", code: "4" },
  { id: 5, name: "Tag 3", code: "5" },
];

export default {
  title: "Input/InputTag",
  component: InputTag,
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
      defaultValue: "First Name",
    },
    placeHolder: {
      control: "text",
      defaultValue: "Enter text",
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
  },
};

const Template: Story = (args) => {
  const [listItem, setListItem] = React.useState<Model[]>(demoItemList);

  const { run } = useDebounceFn(
    (searchTerm: string) => {
      // write call api here
    },
    {
      wait: DEBOUNCE_TIME_300,
    }
  );

  const handleClearItem = React.useCallback(
    (item: Model) => {
      const newListItem = listItem.filter(
        (currentItem) => currentItem.id !== item.id
      );
      setListItem(newListItem);
    },
    [listItem]
  );

  const handleClearMultiItem = React.useCallback(() => {
    setListItem([]);
  }, []);

  const handleSearchItem = React.useCallback(
    (searchTerm: string) => {
      run(searchTerm);
    },
    [run]
  );

  return (
    <div style={{ margin: "10px", width: "380px" }}>
      <div style={{ marginTop: "10px", width: "380px" }}>
        <FormItem>
          <InputTag
            {...args}
            listValue={listItem}
            onSearch={handleSearchItem}
            onClear={handleClearItem}
            onClearMulti={handleClearMultiItem}
          />
        </FormItem>
      </div>

      <Button
        className="btn"
        type="primary"
        onClick={() => setListItem(demoItemList)}
      >
        Reset
      </Button>
    </div>
  );
};

export const Default = Template.bind({});
