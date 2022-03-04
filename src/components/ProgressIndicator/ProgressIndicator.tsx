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

function disabledWheel(event: any) {
  event.preventDefault();
  return false;
}

function elementInViewport(el: any) {
  if (el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}

function ProgressIndicator(props: ProgressIndicatorProps) {
  const { list } = props;
  const [currentSessionId, setCurrentSessionId] = React.useState<number>(
    Number(list[0]?.sessionId) || 1
  );
  const handleChange = React.useCallback((e: any) => {
    document.querySelector(`#frame-${e.target.value}`).scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const handleOnWheel = React.useCallback(
    (event) => {
      if (event.deltaY < 0) {
        if (currentSessionId === 1) return null;
        else {
          document
            .querySelector(`#frame-${currentSessionId - 1}`)
            .scrollIntoView({
              behavior: "smooth",
            });
        }
      } else if (event.deltaY > 0) {
        if (currentSessionId === list.length) return null;
        else {
          document
            .querySelector(`#frame-${currentSessionId + 1}`)
            .scrollIntoView({
              behavior: "smooth",
            });
        }
      }
    },
    [currentSessionId, list.length]
  );

  const handleMouseEnter = React.useCallback(() => {
    document.addEventListener("wheel", disabledWheel, {
      passive: false,
    });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    document.removeEventListener("wheel", disabledWheel);
  }, []);

  React.useEffect(() => {
    if (list) {
      document.onscroll = () => {
        const sessionOnView = list.filter((current) => {
          return elementInViewport(
            document.getElementById(`frame-${current.sessionId}`)
          );
        })[0];
        if (sessionOnView && sessionOnView.sessionId) {
          setCurrentSessionId(sessionOnView.sessionId as number);
        }
      };
    }
  }, [list]);

  return (
    <div
      className="component_progress-indicator"
      onWheel={handleOnWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Radio.Group onChange={handleChange} value={currentSessionId}>
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
