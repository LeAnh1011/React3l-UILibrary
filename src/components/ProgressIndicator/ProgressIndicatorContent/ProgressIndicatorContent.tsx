import { ReactNode } from "react";
export interface ProgressIndicatorContentProps {
  children: ReactNode;
  height?: number;
  width?: number;
  contentId?: string;
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
      className={`${className} m-t--xxxl`}
    >
      {children}
    </div>
  );
}

ProgressIndicatorContent.defaultProps = {
  height: 700,
};
