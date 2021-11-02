import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { InputNumberStories } from "./InputNumber/InputNumber.stories";
import { InputTextStories } from "./InputText/InputText.stories";

storiesOf('Input', module)
  .add(nameof(InputNumberStories), InputNumberStories)
  .add(nameof(InputTextStories), InputTextStories)
