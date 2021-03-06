import { storiesOf } from "@storybook/react";
import { EnumSelectStories } from "./EnumSelect/EnumSelect.stories";
import { MultipleSelectStories } from "./MultipleSelect/MultipleSelect.stories";
import { SingleSelectStories } from "./SingleSelect/Select.stories";

storiesOf("Select", module)
  .add("SingleSelectStories", SingleSelectStories)
  .add("MultipleSelectStories", MultipleSelectStories)
  .add("EnumSelectStories", EnumSelectStories);
