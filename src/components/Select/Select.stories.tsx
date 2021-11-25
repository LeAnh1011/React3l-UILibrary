import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import { SingleSelectStories } from "./SingleSelect/Select.stories";

storiesOf("Select", module).add(
  nameof(SingleSelectStories),
  SingleSelectStories
);
