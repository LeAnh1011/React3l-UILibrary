import React, { ReactSVGElement, RefObject } from "react";
import CloseFilled16 from "@carbon/icons-react/es/close--filled/16";
import "./InputSearchSelect.scss";
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

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      inputRef.current.value = "";
      inputRef.current.focus();
      if (typeof onSearch === "function") {
        onSearch("");
      }
    },
    [onSearch]
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
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className={classNames("input-search-select__wrapper")}>
        <div className={classNames("component__input-search-box")}>
          <input
            type="text"
            onChange={handleChange}
            placeholder={placeHolder}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className={classNames("component__input-search")}
          />

          {inputRef.current?.value && inputRef.current.value.length > 0 && (
            <div
              style={{ width: "16px", height: "20px", paddingTop: 2 }}
              className="m-r--xxs"
            >
              <CloseFilled16
                className="input-icon__clear m-r--xxs mt--xxxs"
                onClick={handleClearInput}
              ></CloseFilled16>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InputSearchSelect;
