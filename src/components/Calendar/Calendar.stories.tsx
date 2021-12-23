import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { DatePickerStories } from "./DatePicker/DatePicker.stories";
import { DateRangeStories } from "./DateRange/DateRange.stories";

storiesOf('Calendar', module)
    .add(nameof(DatePickerStories), DatePickerStories)
    .add(nameof(DateRangeStories), DateRangeStories);