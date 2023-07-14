import { CloseFilled } from "@carbon/icons-react";
import classNames from "classnames";
import React, { ReactSVGElement, RefObject } from "react";
import "./InputSearchSelect.scss";

export interface InputSelectProps {
  expanded?: boolean;
  placeHolder?: string;
  onSearch?: (T: string) => void;
  onKeyDown?: (event: any) => void;
  value?: string | null;
}

function InputSearchSelect(props: InputSelectProps) {
  const { expanded, placeHolder, onSearch, onKeyDown, value } = props;

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
      inputRef.current.focus();
      inputRef.current.value = "";
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

  React.useEffect(() => {
    if (value) {
      inputRef.current.value = value;
    } else {
      inputRef.current.value = null;
    }
  }, [value]);

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
              className="m-r--2xs"
            >
              <CloseFilled
                size={16}
                className="input-icon__clear m-r--2xs"
                onClick={handleClearInput}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InputSearchSelect;
