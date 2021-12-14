import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { AdvanceIdFilterMasterStories } from "./AdvanceIdFilterMaster/AdvanceIdFilterMaster.stories";
import { AdvanceMultipleIdFilterMasterStories } from "./AdvanceMultipleIdFilterMaster/AdvanceMultipleIdFilterMaster.stories";



storiesOf('AdvanceFilterMaster', module)
    .add(nameof(AdvanceIdFilterMasterStories), AdvanceIdFilterMasterStories)
    .add(nameof(AdvanceMultipleIdFilterMasterStories), AdvanceMultipleIdFilterMasterStories);