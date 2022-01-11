import { storiesOf } from "@storybook/react";
import { AdvanceStringFilterStories } from "./AdvanceStringFilter/AdvanceStringFilter.stories";
import { AdvanceNumberFilterStories } from "./AdvanceNumberFilter/AdvanceNumberFilter.stories";
import { AdvanceIdFilterStories } from "./AdvanceIdFilter/AdvanceIdFilter.stories";
import { AdvanceIdMultipleFilterStories } from "./AdvanceIdMultipleFilter/AdvanceIdMultipleFilter.stories";
import { AdvanceTreeFilterStories } from "./AdvanceTreeFilter/AdvanceTreeFilter.stories";
import { AdvanceEnumFilterStories } from "./AdvanceEnumFilter/AdvanceEnumFilter.stories";
import { AdvanceDateRangeFilterStories } from "./AdvanceDateRangeFilter/AdvanceDateRangeFilter.stories";
import { AdvanceDateFilterStories } from "./AdvanceDateFilter/AdvanceFilterDate.stories";
storiesOf("AdvanceFilter", module)
  .add("AdvanceStringFilterStories", AdvanceStringFilterStories)
  .add("AdvanceNumberFilterStories", AdvanceNumberFilterStories)
  .add("AdvanceIdFilterStories", AdvanceIdFilterStories)
  .add("AdvanceIdMultipleFilter", AdvanceIdMultipleFilterStories)
  .add("AdvanceTreeFilterStories", AdvanceTreeFilterStories)
  .add("AdvanceEnumFilter", AdvanceEnumFilterStories)
  .add("AdvanceDateFilterStories", AdvanceDateFilterStories)
  .add("AdvanceDateRangeFilterStories", AdvanceDateRangeFilterStories);
