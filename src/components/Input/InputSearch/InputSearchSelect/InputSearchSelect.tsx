import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled16 } from "@carbon/icons-react";
import "./InputSearchSelect.scss";
import { Model } from "react3l-common";
import classNames from "classnames";

export interface InputSelectProps {
  expanded?: boolean;
  placeHolder?: string;
  onSearch?: (T: string) => void;
  onKeyDown?: (event: any) => void;
}

function InputSearchSelect(props: InputSelectProps) {
  const { expanded, placeHolder, onSearch, onKeyDown } = props;

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
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      if (typeof onKeyDown === "function") {
        onKeyDown(event);
      }
    },
    [onKeyDown]
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
        <div className={classNames("component__input-search-box")}>
          <input
            type="text"
            value={internalModel}
            onChange={handleChange}
            placeholder={placeHolder}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className={classNames("component__input-search")}
          />

          {internalModel && (
            <div style={{ width: "16px", height: "20px" }} className="m-r--xxs">
              <CloseFilled16
                className="input-icon__clear m-r--xxs"
                onClick={handleClearInput}
              ></CloseFilled16>
            </div>
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
