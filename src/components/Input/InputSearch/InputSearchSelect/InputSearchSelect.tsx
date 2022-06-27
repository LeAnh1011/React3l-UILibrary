import React, { ReactSVGElement, RefObject } from "react";
import { CloseFilled16 } from "@carbon/icons-react";
import "./InputSearchSelect.scss";
import classNames from "classnames";
import { Model } from "react3l-common";

export interface InputSelectProps {
  expanded?: boolean;
  placeHolder?: string;
  onSearch?: (T: string) => void;
  onKeyDown?: (event: any) => void;
  value?: Model | string | undefined | null;
}

function InputSearchSelect(props: InputSelectProps) {
  const { expanded, placeHolder, onSearch, onKeyDown, value } = props;

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null
  );


  const [internalValue, setInternalValue] = React.useState(value);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<ReactSVGElement, MouseEvent>) => {
      setInternalValue("");
      inputRef.current.focus();
      if (typeof onSearch === "function") {
        onSearch('');
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
      setInternalValue("");
      inputRef.current.focus();
    }
  }, [expanded]);
 

  return (
    <>
      <div className={classNames("input-search-select__wrapper")}>
        <div className={classNames("component__input-search-box")}>
          <input
            type="text"
            value={internalValue as string}
            onChange={handleChange}
            placeholder={placeHolder}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className={classNames("component__input-search")}
          />

          {internalValue && (
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
