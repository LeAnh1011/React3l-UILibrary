import { storiesOf } from "@storybook/react";
import { AdvanceDateRangeFilterMasterStories } from "./AdvanceDateRangFilterMaster/AdvanceDateRangFilterMaster.stories";
import { AdvanceEnumFilterMasterStories } from "./AdvanceEnumFilterMaster/AdvanceEnumFilterMaster.stories";
import { AdvanceIdFilterMasterStories } from "./AdvanceIdFilterMaster/AdvanceIdFilterMaster.stories";
import { AdvanceMultipleIdFilterMasterStories } from "./AdvanceMultipleIdFilterMaster/AdvanceMultipleIdFilterMaster.stories";
import { TagFilterStories } from "./TagFilter/TagFilter.stories";

storiesOf("AdvanceFilterMaster", module)
  .add("AdvanceIdFilterMasterStories", AdvanceIdFilterMasterStories)
  .add(
    "AdvanceDateRangeFilterMasterStories",
    AdvanceDateRangeFilterMasterStories
  )
  .add(
    "AdvanceMultipleIdFilterMasterStories",
    AdvanceMultipleIdFilterMasterStories
  )
  .add("TagFilterStories", TagFilterStories)
  .add("EnumFilterStories", AdvanceEnumFilterMasterStories);
