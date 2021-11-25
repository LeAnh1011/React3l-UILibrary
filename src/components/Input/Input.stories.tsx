import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import { InputNumberStories } from "./InputNumber/InputNumber.stories";
import { InputSelectStories } from "./InputSelect/InputSelect.stories";
import { InputTextStories } from "./InputText/InputText.stories";

storiesOf("Input", module)
  .add(nameof(InputNumberStories), InputNumberStories)
  .add(nameof(InputTextStories), InputTextStories)
  .add(nameof(InputSelectStories), InputSelectStories);
