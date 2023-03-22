import { Radio } from "antd";
import classNames from "classnames";
import React from "react";
import "./ProgressIndicator.scss";

export interface ProgressIndicatorModel {
  sectionName?: string;
  sectionId?: number;
}

export interface ProgressIndicatorProps {
  list?: ProgressIndicatorModel[];
  idContainer?: string;
  type?: "vertical" | "horizontal";
}

// interface ModifiedChild {
//   id?: string;
//   offsetTopMin?: number;
//   offsetTopMax?: number;
// }

// function disabledWheel(event: any) {
//   event.preventDefault();
//   return false;
// }

function ProgressIndicator(props: ProgressIndicatorProps) {
  const { list, type } = props;
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

  // const handleOnWheel = React.useCallback(
  //   (event) => {
  //     var currentSectionIdValue;
  //     if (event.deltaY < 0) {
  //       if (currentSectionId === 1) return null;
  //       else {
  //         currentSectionIdValue = currentSectionId - 1;
  //         document
  //           .querySelector(`#frame-${currentSectionIdValue}`)
  //           .scrollIntoView({
  //             behavior: "smooth",
  //           });
  //       }
  //     } else if (event.deltaY > 0) {
  //       if (currentSectionId === list.length) return null;
  //       else {
  //         currentSectionIdValue = currentSectionId + 1;
  //         document
  //           .querySelector(`#frame-${currentSectionIdValue}`)
  //           .scrollIntoView({
  //             behavior: "smooth",
  //           });
  //       }
  //     }
  //     setCurrentSectionId(currentSectionIdValue);
  //   },
  //   [currentSectionId, list.length]
  // );

  // const handleMouseEnter = React.useCallback(() => {
  //   document.addEventListener("wheel", disabledWheel, {
  //     passive: false,
  //   });
  //   document.getElementById(idContainer).setAttribute("data", "frozen");
  // }, [idContainer]);

  // const handleMouseLeave = React.useCallback(() => {
  //   document.removeEventListener("wheel", disabledWheel);
  //   document.getElementById(idContainer).removeAttribute("data");
  // }, [idContainer]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const elm = document.getElementById(idContainer);
  //     elm.style.position = "relative";
  //     elm.addEventListener(
  //       "scroll",
  //       _throttle((event: any) => {
  //         const targetElm = event.target as HTMLElement;
  //         const isFrozen = targetElm.getAttribute("data");
  //         if (!isFrozen) {
  //           const childElm = targetElm.children as HTMLCollectionOf<HTMLElement>;
  //           const scrollTop = targetElm.scrollTop;
  //           if (childElm && childElm.length > 0) {
  //             const modifiedChild: ModifiedChild[] = [];
  //             for (let i = 0; i < childElm.length; i++) {
  //               let child = {
  //                 id: childElm[i].id,
  //                 offsetTopMin: childElm[i].offsetTop,
  //                 offsetTopMax:
  //                   i === childElm.length - 1
  //                     ? childElm[i].offsetTop + 10
  //                     : childElm[i + 1].offsetTop,
  //               };
  //               modifiedChild.push(child);
  //             }
  //             const currentSection = modifiedChild.filter(
  //               (currentChild: ModifiedChild) => {
  //                 return (
  //                   currentChild.offsetTopMin <= scrollTop &&
  //                   currentChild.offsetTopMax > scrollTop
  //                 );
  //               }
  //             )[0];
  //             if (currentSection) {
  //               const currentSectionId = currentSection.id.split("-")[1];
  //               setCurrentSectionId(Number(currentSectionId));
  //             }
  //           }
  //         }
  //       }, 100),
  //       false
  //     );
  //     return () => {
  //       var newElement = elm.cloneNode(true);
  //       elm.parentNode.replaceChild(newElement, elm);
  //     };
  //   }, 100);
  // }, [idContainer]);

  return (
    <div
      className={
        type === "vertical"
          ? "component_progress-indicator_vertical"
          : "component_progress-indicator_horizontal"
      }
      // onWheel={handleOnWheel}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {type === "vertical" ? (
        <Radio.Group
          onChange={(e) => handleChange(e.target.value)}
          value={currentSectionId}
          className="progress-indicator_vertical"
        >
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
                      <div className="nav-content-title">
                        {item.sectionName}
                      </div>
                    </Radio>
                  </div>
                </div>
              );
            })}
        </Radio.Group>
      ) : (
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
                    onClick={() => handleChange(item?.sectionId)}
                  >
                    {item.sectionName}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

ProgressIndicator.defaultProps = {
  list: [],
  type: "vertical",
};

export default ProgressIndicator;
