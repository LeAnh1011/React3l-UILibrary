import React from "react";
import "./ProgressIndicator.scss";
import { Radio } from "antd";
import classNames from "classnames";

export interface ProgressIndicatorModel {
  sessionName?: string;
  sessionId?: string | number;
}

export interface ProgressIndicatorProps {
  list?: ProgressIndicatorModel[];
}

function disabledWheel(e: any) {
  e.preventDefault();
  return false;
}

function ProgressIndicator(props: ProgressIndicatorProps) {
  const { list } = props;
  const [currentSessionId, setCurrentSessionId] = React.useState<number>(
    Number(list[0]?.sessionId) || 1
  );
  const onChange = (e: any) => {
    setCurrentSessionId(e.target.value);
    document.querySelector(`#frame-${e.target.value}`).scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleOnWheel = React.useCallback(
    (event) => {
      if (event.deltaY < 0) {
        if (currentSessionId === 1) return null;
        else {
          const newNB = currentSessionId - 1;
          setCurrentSessionId(newNB);
          document
            .querySelector(`#frame-${currentSessionId - 1}`)
            .scrollIntoView({
              behavior: "smooth",
            });
        }
      } else if (event.deltaY > 0) {
        if (currentSessionId === list.length) return null;
        else {
          const newNB = currentSessionId + 1;
          setCurrentSessionId(newNB);
          document
            .querySelector(`#frame-${currentSessionId + 1}`)
            .scrollIntoView({
              behavior: "smooth",
            });
        }
      }
    },
    [currentSessionId, setCurrentSessionId, list.length]
  );

  const handleMouseEnter = React.useCallback(() => {
    document.addEventListener("wheel", disabledWheel, {
      passive: false,
    });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    document.removeEventListener("wheel", disabledWheel);
  }, []);

  return (
    <div
      className="component_process-indicator"
      onWheel={handleOnWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Radio.Group onChange={onChange} value={currentSessionId}>
        {list?.length > 0 &&
          list.map((item) => {
            return (
              <div
                className={classNames("nav-content", {
                  "nav-content-active":
                    Number(item.sessionId) === currentSessionId,
                })}
                key={item.sessionId}
              >
                <div style={{ height: 16 }}>
                  <Radio
                    value={item.sessionId}
                    className="table-of-contents-radio"
                  >
                    <div className="nav-content-title">{item.sessionName}</div>
                  </Radio>
                </div>
              </div>
            );
          })}
      </Radio.Group>
    </div>
  );
}

ProgressIndicator.defaultProps = {
  list: [],
};

export default ProgressIndicator;
