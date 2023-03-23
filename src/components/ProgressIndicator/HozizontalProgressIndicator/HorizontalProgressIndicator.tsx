import classNames from "classnames";
import React from "react";
import { ProgressIndicatorModel } from "../ProgressIndicator";
import "./HorizontalProgressIndicator.scss";

export interface HorizontalProgressIndicatorProps {
  list?: ProgressIndicatorModel[];
  idContainer?: string;
}

function HorizontalProgressIndicator(props: HorizontalProgressIndicatorProps) {
  const { list } = props;
  const [currentSectionId, setCurrentSectionId] = React.useState<number>(
    Number(list[0]?.sectionId) || 1
  );
  const handleChange = React.useCallback((value) => {
    const currentSectionIdValue = value;
    document.querySelector(`#frame-${currentSectionIdValue}`).scrollIntoView({
      behavior: "smooth",
    });
    setCurrentSectionId(currentSectionIdValue);
  }, []);

  return (
    <div className="component_progress-indicator_horizontal">
      <div className={"component_progress-indicator_horizontal__container"}>
        <div className="progress-indicator_horizontal">
          <div className="list-nav-content">
            {list?.length > 0 &&
              list.map((item) => {
                return (
                  <div
                    key={item?.sectionId}
                    className={classNames("nav-content", {
                      "nav-content-active":
                        Number(item.sectionId) === currentSectionId,
                    })}
                    tabIndex={0}
                    onClick={() => handleChange(item?.sectionId)}
                    onKeyDown={(event: any) => {
                      if (event?.keyCode === 13) {
                        handleChange(item?.sectionId);
                      }
                    }}
                  >
                    {item.sectionName}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

HorizontalProgressIndicator.defaultProps = {
  list: [],
};

export default HorizontalProgressIndicator;
