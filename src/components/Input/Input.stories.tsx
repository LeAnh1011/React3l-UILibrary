import { storiesOf } from "@storybook/react";
import { InputNumberStories } from "./InputNumber/InputNumber.stories";
import { InputRangeStories } from "./InputRange/InputRange.stories";
import { InputSearchStories } from "./InputSearch/InputSearch.stories";
import { InputSelectStories } from "./InputSelect/InputSelect.stories";
import { InputTagStories } from "./InputTag/InputTag.stories";
import { InputTextStories } from "./InputText/InputText.stories";
import { DatePickerStories } from "./DatePicker/DatePicker.stories";
import { DateRangeStories } from "./DateRange/DateRange.stories";
import { TextAreaStories } from "./TextArea/TextArea.stories";
import { InputViewStories } from "./InputView/InputView.stories";
import { TimePickerStories } from "./TimePicker/TimePicker.stories";

storiesOf("Input", module)
  .add("InputNumberStories", InputNumberStories)
  .add("InputTextStories", InputTextStories)
  .add("InputSelectStories", InputSelectStories)
  .add("InputTagStories", InputTagStories)
  .add("InputSearchStories", InputSearchStories)
  .add("InputRangeStories", InputRangeStories)
  .add("TextAreaStories", TextAreaStories)
  .add("DatePickerStories", DatePickerStories)
  .add("DateRangeStories", DateRangeStories)
  .add("InputViewStories", InputViewStories)
  .add("TimePickerStories", TimePickerStories);
