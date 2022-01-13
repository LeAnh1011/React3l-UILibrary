import { storiesOf } from "@storybook/react";
import { InputNumberStories } from "./InputNumber/InputNumber.stories";
import { InputSearchStories } from "./InputSearch/InputSearch.stories";
import { InputSelectStories } from "./InputSelect/InputSelect.stories";
import { InputTagStories } from "./InputTag/InputTag.stories";
import { InputTextStories } from "./InputText/InputText.stories";

storiesOf("Input", module)
  .add("InputNumberStories", InputNumberStories)
  .add("InputTextStories", InputTextStories)
  .add("InputSelectStories", InputSelectStories)
  .add("InputTagStories", InputTagStories)
  .add("InputSearchStories", InputSearchStories);
