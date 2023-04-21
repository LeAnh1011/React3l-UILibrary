import HorizontalProgressIndicator from "./HozizontalProgressIndicator/HorizontalProgressIndicator";
import VerticalProgressIndicator from "./VerticalProgressIndicator/VerticalProgressIndicator";
import ProgressIndicatorContent from "./ProgressIndicatorContent/ProgressIndicatorContent";
export interface ProgressIndicatorModel {
  sectionName?: string;
  sectionId?: number;
}

export interface ProgressIndicatorProps {
  /**Pass list section [{sectionName,sectionId}] */
  list?: ProgressIndicatorModel[];
  /**Pass Id of ProgressIndicatorContent to control action scroll */
  idContainer?: string;
  /**An option to set  vertical or horizontal type*/
  type?: "vertical" | "horizontal";
  /**Use to custom style the component*/
  className?: string;
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const { type } = props;
  if (type === "vertical") return <VerticalProgressIndicator {...props} />;
  else if (type === "horizontal")
    return <HorizontalProgressIndicator {...props} />;
  return <></>;
};
ProgressIndicator.Content = ProgressIndicatorContent;

ProgressIndicator.defaultProps = {
  list: [],
  type: "vertical",
};

export default ProgressIndicator;
