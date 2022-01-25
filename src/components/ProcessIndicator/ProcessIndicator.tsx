import React, { Dispatch, SetStateAction } from "react";
import "./ProcessIndicator.scss";
import { Radio } from "antd";
import classNames from "classnames";

export interface ProcessIndicatorModel {
  sessionName?: string;
  sessionId?: string | number;
}

export interface ProcessIndicatorProps {
  list?: ProcessIndicatorModel[];
  currentSessionId?: number;
  setCurrentSessionId: Dispatch<SetStateAction<number>>;
}

function ProcessIndicator(props: ProcessIndicatorProps) {
  const { list, currentSessionId, setCurrentSessionId } = props;

  const onChange = (e: any) => {
    setCurrentSessionId(e.target.value);
  };

  const handleOnWheel = React.useCallback(
    (event) => {
      if (event.deltaY < 0) {
        // console.log("wheel up");
        if (currentSessionId === 1) return null;
        else {
          const newNB = currentSessionId - 1;
          setCurrentSessionId(newNB);
        }
      } else if (event.deltaY > 0) {
        // console.log("wheel down");
        if (currentSessionId === list.length) return null;
        else {
          const newNB = currentSessionId + 1;
          setCurrentSessionId(newNB);
        }
      }
    },
    [currentSessionId, setCurrentSessionId, list.length]
  );
  return (
    <div className="component_process-indicator" onWheel={handleOnWheel}>
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

ProcessIndicator.defaultProps = {
  list: [],
};

export default ProcessIndicator;
