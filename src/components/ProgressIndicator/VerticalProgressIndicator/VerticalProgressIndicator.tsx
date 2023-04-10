import React from "react";
import { Radio } from "antd";
import classNames from "classnames";
import _throttle from "lodash/throttle";
import { ProgressIndicatorModel } from "../ProgressIndicator";
import "./VerticalProgressIndicator.scss";

export interface VerticalProgressIndicatorProps {
  list?: ProgressIndicatorModel[];
  idContainer?: string;
}

interface ModifiedChild {
  id?: string;
  offsetTopMin?: number;
  offsetTopMax?: number;
}

function disabledWheel(event: any) {
  event.preventDefault();
  return false;
}

function VerticalProgressIndicator(props: VerticalProgressIndicatorProps) {
  const { list, idContainer } = props;
  const [currentSectionId, setCurrentSectionId] = React.useState<number>(
    Number(list[0]?.sectionId) || 1
  );
  const handleChange = React.useCallback((e: any) => {
    const currentSectionIdValue = e.target.value;
    document.querySelector(`#frame-${currentSectionIdValue}`).scrollIntoView({
      behavior: "smooth",
    });
    setCurrentSectionId(currentSectionIdValue);
  }, []);

  const handleOnWheel = React.useCallback(
    (event) => {
      var currentSectionIdValue;
      if (event.deltaY < 0) {
        if (currentSectionId === 1) return null;
        else {
          currentSectionIdValue = currentSectionId - 1;
          document
            .querySelector(`#frame-${currentSectionIdValue}`)
            .scrollIntoView({
              behavior: "smooth",
            });
        }
      } else if (event.deltaY > 0) {
        if (currentSectionId === list.length) return null;
        else {
          currentSectionIdValue = currentSectionId + 1;
          document
            .querySelector(`#frame-${currentSectionIdValue}`)
            .scrollIntoView({
              behavior: "smooth",
            });
        }
      }
      setCurrentSectionId(currentSectionIdValue);
    },
    [currentSectionId, list.length]
  );

  const handleMouseEnter = React.useCallback(() => {
    document.addEventListener("wheel", disabledWheel, {
      passive: false,
    });
    document.getElementById(idContainer).setAttribute("data", "frozen");
  }, [idContainer]);

  const handleMouseLeave = React.useCallback(() => {
    document.removeEventListener("wheel", disabledWheel);
    document.getElementById(idContainer).removeAttribute("data");
  }, [idContainer]);

  React.useEffect(() => {
    setTimeout(() => {
      const elm = document.getElementById(idContainer);
      elm.style.position = "relative";
      elm.addEventListener(
        "scroll",
        _throttle((event: any) => {
          const targetElm = event.target as HTMLElement;
          const isFrozen = targetElm.getAttribute("data");
          if (!isFrozen) {
            const childElm = targetElm.children as HTMLCollectionOf<HTMLElement>;
            const scrollTop = targetElm.scrollTop;
            if (childElm && childElm.length > 0) {
              const modifiedChild: ModifiedChild[] = [];
              for (let i = 0; i < childElm.length; i++) {
                let child = {
                  id: childElm[i].id,
                  offsetTopMin: childElm[i].offsetTop,
                  offsetTopMax:
                    i === childElm.length - 1
                      ? childElm[i].offsetTop + 10
                      : childElm[i + 1].offsetTop,
                };
                modifiedChild.push(child);
              }
              const currentSection = modifiedChild.filter(
                (currentChild: ModifiedChild) => {
                  return (
                    currentChild.offsetTopMin <= scrollTop &&
                    currentChild.offsetTopMax > scrollTop
                  );
                }
              )[0];
              if (currentSection) {
                const currentSectionId = currentSection.id.split("-")[1];
                setCurrentSectionId(Number(currentSectionId));
              }
            }
          }
        }, 100),
        false
      );
      return () => {
        var newElement = elm.cloneNode(true);
        elm.parentNode.replaceChild(newElement, elm);
      };
    }, 100);
  }, [idContainer]);

  return (
    <div
      className="component_progress-indicator_vertical"
      onWheel={handleOnWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Radio.Group onChange={handleChange} value={currentSectionId}>
        {list?.length > 0 &&
          list.map((item) => {
            return (
              <div
                className={classNames("nav-content", {
                  "nav-content-active":
                    Number(item.sectionId) === currentSectionId,
                })}
                key={item.sectionId}
              >
                <div style={{ height: 16 }}>
                  <Radio
                    value={item.sectionId}
                    className="table-of-contents-radio"
                  >
                    <div className="nav-content-title">{item.sectionName}</div>
                  </Radio>
                </div>
              </div>
            );
          })}
      </Radio.Group>
    </div>
  );
}

VerticalProgressIndicator.defaultProps = {
  list: [],
};

export default VerticalProgressIndicator;
