import { storiesOf } from "@storybook/react";
import { AdvanceStringFilterStories } from "./AdvanceStringFilter/AdvanceStringFilter.stories";
import { AdvanceNumberFilterStories } from "./AdvanceNumberFilter/AdvanceNumberFilter.stories";
import { AdvanceIdFilterStories } from "./AdvanceIdFilter/AdvanceIdFilter.stories";
import { AdvanceIdMultipleFilterStories } from "./AdvanceIdMultipleFilter/AdvanceIdMultipleFilter.stories";
storiesOf("AdvanceFilter", module)
  .add("AdvanceStringFilterStories", AdvanceStringFilterStories)
  .add("AdvanceNumberFilterStories", AdvanceNumberFilterStories)
  .add("AdvanceIdFilterStories", AdvanceIdFilterStories)
  .add("AdvanceIdMultipleFilter", AdvanceIdMultipleFilterStories);
