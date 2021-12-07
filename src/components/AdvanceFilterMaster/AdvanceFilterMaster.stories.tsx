import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { AdvanceIdFilterMasterStories } from "./AdvanceIdFilterMaster/AdvanceIdFilterMaster.stories";



storiesOf('AdvanceFilterMaster', module)
    .add(nameof(AdvanceIdFilterMasterStories), AdvanceIdFilterMasterStories);