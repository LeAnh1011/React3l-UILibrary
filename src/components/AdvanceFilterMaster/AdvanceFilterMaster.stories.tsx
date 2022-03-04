import { storiesOf } from "@storybook/react";
import { AdvanceDateRangeFilterMasterStories } from "./AdvanceDateRangFilterMaster/AdvanceDateRangFilterMaster.stories";
import { AdvanceIdFilterMasterStories } from "./AdvanceIdFilterMaster/AdvanceIdFilterMaster.stories";
import { AdvanceMultipleIdFilterMasterStories } from "./AdvanceMultipleIdFilterMaster/AdvanceMultipleIdFilterMaster.stories";
import { AdvanceTreeFilterMasterStories } from "./AdvanceTreeFilterMaster/AdvanceTreeFilterMaster.stories";
import { TagFilterStories } from "./TagFilter/TagFilter.stories";
import { AdvanceEnumFilterMasterStories } from "./AdvanceEnumFilterMaster/AdvanceEnumFilterMaster.stories";

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
  .add("AdvanceTreeFilterMasterStories", AdvanceTreeFilterMasterStories)
  .add("TagFilterStories", TagFilterStories)
  .add("EnumFilterStories", AdvanceEnumFilterMasterStories);
