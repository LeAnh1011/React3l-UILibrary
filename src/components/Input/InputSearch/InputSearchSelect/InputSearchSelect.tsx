import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled16 } from "@carbon/icons-react";
import "./InputSearchSelect.scss";
import { Model } from "react3l-common";
import classNames from "classnames";
import { InputSearchType } from "../InputSearch";

export interface InputSelectProps<T extends Model> {
  model?: T;
  expanded?: boolean;
  placeHolder?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
  onKeyDown?: (event: any) => void;
  onKeyEnter?: (event: any) => void;
  type?: InputSearchType;
}

function InputSearchSelect(props: InputSelectProps<Model>) {
  const {
    model,
    expanded,
    placeHolder,
    render,
    onClear,
    onSearch,
    onKeyDown,
    onKeyEnter,
    type,
  } = props;

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );

  const [internalModel, setInternalModel] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalModel(event.target.value);
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      setInternalModel("");
      inputRef.current.focus();
      event.stopPropagation();
    },
    []
  );

  const handleClearItem = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      if (typeof onClear === "function") {
        onClear(null);
      }
      event.stopPropagation();
    },
    [onClear]
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      if (typeof onKeyDown === "function") {
        onKeyDown(event);
      }
    },
    [onKeyDown]
  );

  const handleEnter = React.useCallback(
    (event) => {
      if (typeof onKeyEnter === "function") {
        onKeyEnter(event);
      }
    },
    [onKeyEnter]
  );

  React.useEffect(() => {
    if (expanded) {
      setInternalModel("");
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className={classNames("input-search-select__wrapper")}>
        <div
          className={classNames("component__input-search-box", {
            "background-type1": type === "type1",
          })}
        >
          {expanded ? (
            <>
              <input
                type="text"
                value={internalModel}
                onChange={handleChange}
                placeholder={model ? (render(model) as string) : placeHolder}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                className={classNames("component__input-search", {
                  "background-type1": type === "type1",
                })}
              />

              {internalModel ? (
                <div
                  style={{ width: "16px", height: "20px" }}
                  className="m-r--xxs"
                >
                  <CloseFilled16
                    className="input-icon__clear m-r--xxs"
                    onClick={handleClearInput}
                  ></CloseFilled16>
                </div>
              ) : model ? (
                <div
                  style={{ width: "16px", height: "20px" }}
                  className="m-r--xxs"
                >
                  <CloseFilled16
                    className="input-icon__clear"
                    onClick={handleClearItem}
                  ></CloseFilled16>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <input
                type="text"
                value={(render(model) as string) || ""}
                readOnly
                placeholder={placeHolder}
                onKeyDown={handleEnter}
                className={classNames("component__input-search", {
                  "background-type1": type === "type1",
                })}
                ref={inputRef}
              />
              {model && (
                <div
                  style={{ width: "16px", height: "20px" }}
                  className="m-r--xxs"
                >
                  <CloseFilled16
                    className="input-icon input-icon__clear"
                    onClick={handleClearItem}
                  ></CloseFilled16>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name || "";
}

InputSearchSelect.defaultProps = {
  render: defaultRenderObject,
  expanded: false,
};

export default InputSearchSelect;
