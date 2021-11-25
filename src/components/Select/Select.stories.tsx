import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import { MultipleSelectStories } from "./MultipleSelect/MultipleSelect.stories";
import { SingleSelectStories } from "./SingleSelect/Select.stories";

storiesOf("Select", module)
  .add(nameof(SingleSelectStories), SingleSelectStories)
  .add(nameof(MultipleSelectStories), MultipleSelectStories);
