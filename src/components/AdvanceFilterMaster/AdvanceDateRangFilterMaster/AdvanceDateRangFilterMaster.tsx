import Calendar16 from "@carbon/icons-react/es/calendar/16";
import ChevronDown16 from "@carbon/icons-react/es/chevron--down/16";
import DateRange from "@Components/Calendar/DateRange";
import InputSelect from "@Components/Input/InputSelect";
import { BORDER_TYPE } from "@Configs/enum";
import { CommonService } from "@Services/common-service";
import classNames from "classnames";
import { TFunction } from "i18next";
import moment, { Moment } from "moment";
import React, { RefObject } from "react";
import { Model } from "react3l-common";
import "./AdvanceDateRangFilterMaster.scss";

export enum ADVANCE_DATE_RANGE_TYPE {
  SHORT,
  INPUT,
}

class ListDate extends Model {
  id?: number;
  name?: string;
  code?: string;
}

interface AdvanceDateRangeFilterMasterProps {
  value?: [Moment, Moment];

  dateFormat?: string[];

  onChange?: (item?: any, value?: [Moment, Moment]) => void;

  className?: string;

  disabled?: boolean;

  typeCustomDate?: BORDER_TYPE;

  isSmall?: boolean;

  label?: string;

  activeItem?: any;

  type?: ADVANCE_DATE_RANGE_TYPE;

  inputType?: BORDER_TYPE;

  placeHolderSelect?: string;

  appendToBody?: boolean;

  translate?: TFunction;

  placeholder?: [string, string];
}

const list: ListDate[] = [
  { id: 1, name: "general.filter.today", code: "today" },
  { id: 2, name: "general.filter.yesterday", code: "yesterday" },
  { id: 3, name: "general.filter.thisWeek", code: "thisweek" },
  { id: 4, name: "general.filter.lastWeek", code: "lastweek" },
  { id: 5, name: "general.filter.thisMonth", code: "thismonth" },
  { id: 6, name: "general.filter.lastMonth", code: "lastmonth" },
  { id: 7, name: "general.filter.thisQuarter", code: "thisquarter" },
  { id: 8, name: "general.filter.lastQuarter", code: "lastquarter" },
];

function AdvanceDateRangeFilterMaster(
  props: AdvanceDateRangeFilterMasterProps
) {
  const {
    value,
    onChange,
    label,
    className,
    disabled,
    appendToBody,
    typeCustomDate,
    isSmall,
    activeItem,
    placeholder,
    type,
    inputType,
    placeHolderSelect,
    translate,
    ...rest
  } = props;

  const [isExpand, setExpand] = React.useState<boolean>(false);
  const [isExpandDate, setExpandDate] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const panelRef = React.useRef(null);
  const listRef = React.useRef(null);

  const formatDateFilter = React.useCallback((item: any): [Moment, Moment] => {
    if (item) {
      switch (item.id) {
        case 1:
          return [moment().startOf("day"), moment().endOf("day")]; //today

        case 2:
          return [
            moment().subtract(1, "days").startOf("day"),
            moment().subtract(1, "days").endOf("day"),
          ];

        case 3:
          return [moment().startOf("isoWeek"), moment().endOf("isoWeek")]; //thisweek

        case 4:
          return [
            moment().subtract(1, "weeks").startOf("isoWeek"),
            moment().subtract(1, "weeks").endOf("isoWeek"),
          ]; //lastweek

        case 5:
          return [moment().startOf("month"), moment().endOf("month")]; //thismonth

        case 6:
          return [
            moment().subtract(1, "months").startOf("month"),
            moment().subtract(1, "months").endOf("month"),
          ]; //lastmonth

        case 7:
          const quarterNumber = moment().quarter();
          const quarterEndDate = moment()
            .quarter(quarterNumber)
            .endOf("quarter");
          const quarterStartDate = moment()
            .quarter(quarterNumber)
            .startOf("quarter");
          return [quarterStartDate, quarterEndDate]; //thisquarter

        case 8:
          const thisQuarter = moment().quarter();
          const lastQuarter = thisQuarter - 1;
          var lastQuarterStartDate, lastQuarterEndDate;
          if (lastQuarter) {
            lastQuarterStartDate = moment()
              .quarter(lastQuarter)
              .startOf("quarter");
            lastQuarterEndDate = moment().quarter(lastQuarter).endOf("quarter");
          } else {
            lastQuarterStartDate = moment()
              .subtract(1, "years")
              .quarter(4)
              .startOf("quarter");
            lastQuarterEndDate = moment()
              .subtract(1, "years")
              .quarter(4)
              .endOf("quarter");
          }
          return [lastQuarterStartDate, lastQuarterEndDate]; //lastquarter
        default:
          return [null, null];
      }
    }
  }, []);

  const internalValue: [Moment, Moment] = React.useMemo(() => {
    return value && value.length > 0
      ? [
          typeof value[0] === "string"
            ? CommonService.toMomentDate(value[0])
            : value[0],
          typeof value[1] === "string"
            ? CommonService.toMomentDate(value[1])
            : value[1],
        ]
      : [null, null];
  }, [value]);

  const handleChange = React.useCallback(
    (values: [Moment, Moment], formatString: [string, string]) => {
      onChange(
        { id: 9, name: "general.filter.customDate", code: "customdate" },
        [values[0]?.startOf("day"), values[1]?.endOf("day")]
      );
    },
    [onChange]
  );

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
        setTimeout(() => {
          listRef.current.focus();
        }, 300);
      }
    },
    [disabled, listRef]
  );

  const handleCloseAdvanceFilterMaster = React.useCallback(() => {
    setExpand(false);
    if (internalValue[0] || internalValue[1]) {
      return;
    }
    setExpandDate(false);
  }, [internalValue]);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const values = formatDateFilter(item);
      onChange(item, values);
      handleCloseAdvanceFilterMaster();
    },
    [formatDateFilter, handleCloseAdvanceFilterMaster, onChange]
  );

  const handleClickCustomDate = React.useCallback(() => {
    setExpandDate(true);
  }, []);

  const handleGetRef = React.useCallback(() => {
    return document.getElementsByClassName("date-range-master");
  }, []);

  const handleOpenChange = React.useCallback(() => {
    setTimeout(() => {
      panelRef.current = handleGetRef()[0];
    }, 100);
  }, [handleGetRef]);

  const handleKeyDown = React.useCallback(
    (event) => {
      switch (event.keyCode) {
        case 40:
          const firstItem = selectListRef.current
            .firstElementChild as HTMLElement;
          firstItem.focus();
          break;
        case 9:
          handleCloseAdvanceFilterMaster();
          break;
        default:
          return;
      }
    },
    [handleCloseAdvanceFilterMaster]
  );

  const handleMove = React.useCallback(
    (item) => (event: any) => {
      switch (event.keyCode) {
        case 13:
          handleClickItem(item)(null);
          break;
        case 40:
          if (event.target.nextElementSibling !== null) {
            event.target.nextElementSibling.focus();
          }
          event.preventDefault();
          break;
        case 38:
          if (event.target.previousElementSibling !== null) {
            event.target.previousElementSibling.focus();
          }
          event.preventDefault();
          break;
      }
      return;
    },
    [handleClickItem]
  );

  CommonService.useClickOutsideMultiple(
    wrapperRef,
    panelRef,
    handleCloseAdvanceFilterMaster
  );

  const handleClearItem = React.useCallback(() => {
    onChange(null, [null, null]);
  }, [onChange]);

  const renderItem = React.useCallback(
    (currentItem: ListDate) => {
      if (currentItem) {
        return translate(currentItem?.name);
      }
      return null;
    },
    [translate]
  );

  return (
    <div
      className={classNames(
        "advance-date-range-filter-master__wrapper",
        className
      )}
      ref={wrapperRef}
    >
      {type === ADVANCE_DATE_RANGE_TYPE.SHORT ? (
        <div
          className={classNames(
            "advance-date-range-filter-master__container p-l--sm p-t--xs p-r--xs p-b--xs",
            {
              "filter-bg": isExpand,
              "p-b---active": value && value?.length > 0 && value[0],
            }
          )}
          onClick={handleToggle}
        >
          <div
            className={classNames({
              "filter-active": value && value?.length > 0 && value[0],
            })}
          >
            <div className="advance-date-range-filter-master__title">
              <span className="filter-title"> {label}</span>
              <ChevronDown16 />
            </div>
          </div>
        </div>
      ) : (
        <div className="select__input" onClick={handleToggle}>
          <InputSelect
            value={activeItem} // value of input, event should change these on update
            placeHolder={placeHolderSelect}
            expanded={isExpand}
            disabled={disabled}
            onClear={handleClearItem}
            type={inputType}
            label={label}
            isSmall={isSmall}
            onKeyDown={handleKeyDown}
            render={renderItem}
          />
        </div>
      )}

      {isExpand && (
        <div
          id="list-container"
          className={classNames("date-range-filter-master__list-container", {
            "date-range-filter-master__list-border":
              type === ADVANCE_DATE_RANGE_TYPE.SHORT,
            "": type === ADVANCE_DATE_RANGE_TYPE.INPUT,
          })}
          ref={listRef}
        >
          <div className="advance-date-range-master__list" ref={selectListRef}>
            {list.length > 0 &&
              list.map((item, index) => (
                <div
                  className={classNames(
                    "advance-date-range-filter__item p--xs",
                    { "filter__item--selected": item?.id === activeItem?.id }
                  )}
                  tabIndex={-1}
                  key={index}
                  onClick={handleClickItem(item)}
                  onKeyDown={handleMove(item)}
                >
                  <span className="advance-date-range-filter__text">
                    {translate ? translate(item?.name) : item?.code}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={classNames("date-range-master__prefer-option p--xs", {
              "date-range-master__bg-primary": activeItem?.id === 9,
            })}
            onClick={handleClickCustomDate}
          >
            <Calendar16 />
            <span>
              {translate
                ? translate("general.filter.customDate")
                : "Custom Date"}
            </span>
          </div>
          {isExpandDate && (
            <>
              <DateRange
                {...rest}
                label=""
                type={typeCustomDate}
                isSmall={isSmall}
                onChange={handleChange}
                value={internalValue}
                getPopupContainer={
                  !appendToBody
                    ? () => document.getElementById("list-container")
                    : null
                }
                placeholder={placeholder}
                disabled={disabled}
                dropdownClassName="date-range-master"
                onOpenChange={handleOpenChange}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

AdvanceDateRangeFilterMaster.defaultProps = {
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  placeholder: ["Từ ngày", "Đến ngày"],
  type: ADVANCE_DATE_RANGE_TYPE.SHORT,
  placeHolderSelect: "",
  appendToBody: false,
};

export default AdvanceDateRangeFilterMaster;
