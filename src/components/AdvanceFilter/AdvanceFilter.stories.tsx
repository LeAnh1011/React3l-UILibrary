import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import { AdvanceStringFilterStories } from "./AdvanceStringFilter/AdvanceStringFilter.stories";

storiesOf("AdvanceFilter", module).add(
  nameof(AdvanceStringFilterStories),
  AdvanceStringFilterStories
);
