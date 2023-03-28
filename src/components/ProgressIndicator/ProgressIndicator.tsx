import HorizontalProgressIndicator from "./HozizontalProgressIndicator/HorizontalProgressIndicator";
import VerticalProgressIndicator from "./VerticalProgressIndicator/VerticalProgressIndicator";
import ProgressIndicatorContent from "./ProgressIndicatorContent/ProgressIndicatorContent";
export interface ProgressIndicatorModel {
  sectionName?: string;
  sectionId?: number;
}

export interface ProgressIndicatorProps {
  list?: ProgressIndicatorModel[];
  idContainer?: string;
  type?: "vertical" | "horizontal";
  className?: string;
}

export default function ProgressIndicator(props: ProgressIndicatorProps) {
  const { type } = props;
  if (type === "vertical") return <VerticalProgressIndicator {...props} />;
  else if (type === "horizontal")
    return <HorizontalProgressIndicator {...props} />;
  return <></>;
}

ProgressIndicator.Content = ProgressIndicatorContent;

ProgressIndicator.defaultProps = {
  list: [],
  type: "vertical",
};
