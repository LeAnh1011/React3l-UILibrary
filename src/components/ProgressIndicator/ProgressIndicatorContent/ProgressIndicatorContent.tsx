import { ReactNode } from "react";
export interface ProgressIndicatorContentProps {
  children: ReactNode;
  /**Set max height of view cover content */
  height?: number;
  /**Set max width of view cover content */
  width?: number;
  /**Set contentId so ProgressIndicator can control data view/action scroll */
  contentId?: string;
  /**Use to custom style the component*/
  className?: string;
}

export default function ProgressIndicatorContent(
  props: ProgressIndicatorContentProps
) {
  const { children, width, height, contentId, className } = props;

  return (
    <div
      id={contentId}
      style={{ height: height, width: width, overflow: "auto" }}
      className={className}
    >
      {children}
    </div>
  );
}

ProgressIndicatorContent.defaultProps = {
  height: 700,
};
