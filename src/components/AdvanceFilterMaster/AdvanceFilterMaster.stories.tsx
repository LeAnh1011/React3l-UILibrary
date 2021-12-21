import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { AdvanceDateRangeFilterMasterStories } from "./AdvanceDateRangFilterMaster/AdvanceDateRangFilterMaster.stories";
import { AdvanceIdFilterMasterStories } from "./AdvanceIdFilterMaster/AdvanceIdFilterMaster.stories";
import { AdvanceMultipleIdFilterMasterStories } from "./AdvanceMultipleIdFilterMaster/AdvanceMultipleIdFilterMaster.stories";



storiesOf('AdvanceFilterMaster', module)
    .add(nameof(AdvanceIdFilterMasterStories), AdvanceIdFilterMasterStories)
    .add(nameof(AdvanceDateRangeFilterMasterStories), AdvanceDateRangeFilterMasterStories)
    .add(nameof(AdvanceMultipleIdFilterMasterStories), AdvanceMultipleIdFilterMasterStories);