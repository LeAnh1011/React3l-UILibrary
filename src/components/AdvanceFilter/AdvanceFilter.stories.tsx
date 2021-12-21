import { storiesOf } from "@storybook/react";
import { AdvanceStringFilterStories } from "./AdvanceStringFilter/AdvanceStringFilter.stories";
import { AdvanceNumberFilterStories } from "./AdvanceNumberFilter/AdvanceNumberFilter.stories";
storiesOf("AdvanceFilter", module)
  .add("AdvanceStringFilterStories", AdvanceStringFilterStories)
  .add("AdvanceNumberFilterStories", AdvanceNumberFilterStories);
