import { Calendar16 } from "@carbon/icons-react";
import { RangePickerProps } from "antd/lib/date-picker";
import classNames from "classnames";
import DateRange from "components/Calendar/DateRange";
import { BORDER_TYPE } from "config/enum";
import { InputSelect } from "index";
import moment, { Moment } from "moment";
import React, { RefObject } from "react";
import { Model } from "react3l-common";
import { CommonService } from "services/common-service";
import "./AdvanceDateRangFilterMaster.scss";

export enum ADVANCE_DATE_RANGE_TYPE {
  SHORT,
  INPUT,
}

interface AdvanceDateRangeFilterProps {
  value?: [Moment, Moment];

  dateFormat?: string[];

  isMaterial?: boolean;

  onChange?: (item: any, value: [Moment, Moment]) => void;

  title?: string;

  className?: string;

  disabled?: boolean;

  render?: (t: Model) => string;

  typeCustomDate?: BORDER_TYPE;

  isSmall?: boolean;

  label?: string;

  placeholder?: string;

  activeItem?: any;

  type?: ADVANCE_DATE_RANGE_TYPE;

  inputType?: BORDER_TYPE;

  placeHolderSelect?: string;
}

const list = [
  { id: 1, name: "Today", code: "today" },
  { id: 2, name: "Yesterday", code: "yesterday" },
  { id: 3, name: "This week", code: "thisweek" },
  { id: 4, name: "Last week", code: "lastweek" },
  { id: 5, name: "This month", code: "thismonth" },
  { id: 6, name: "Last month", code: "lastmonth" },
  { id: 7, name: "This quarter", code: "thisquarter" },
  { id: 8, name: "Last quarter", code: "lastquarter" },
];

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function AdvanceDateRangeFilter(
  props: AdvanceDateRangeFilterProps & RangePickerProps
) {
  const {
    value,
    onChange,
    title,
    className,
    disabled,
    render,
    typeCustomDate,
    isSmall,
    activeItem,
    placeholder,
    type,
    inputType,
    placeHolderSelect,
  } = props;

  const [isExpand, setExpand] = React.useState<boolean>(false);
  const [isExpandDate, setExpandDate] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const selectListRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

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
          const sdjustment = (moment().month() % 3) + 1;
          const lastQuarterEndDate2 = moment()
            .subtract({ months: sdjustment })
            .endOf("month");

          var quarterEndDate = moment().endOf("month");
          var quarterStartDate = lastQuarterEndDate2.clone().startOf("month");
          return [quarterStartDate, quarterEndDate]; //thisquarter

        case 8:
          const quarterAdjustment = (moment().month() % 3) + 1;
          const lastQuarterEndDate = moment()
            .subtract({ months: quarterAdjustment })
            .endOf("month");
          const lastQuarterStartDate = lastQuarterEndDate
            .clone()
            .subtract({ months: 3 })
            .startOf("month");
          return [lastQuarterStartDate, lastQuarterEndDate]; //lastquarter
        default:
          return [null, null];
      }
    }
  }, []);

  const internalValue: [Moment, Moment] = React.useMemo(() => {
    return [
      value && value?.length > 0 && typeof value[0] === "string"
        ? CommonService.toMomentDate(value[0])
        : value[0],
      value && value?.length > 0 && typeof value[1] === "string"
        ? CommonService.toMomentDate(value[1])
        : value[1],
    ];
  }, [value]);

  const handleChange = React.useCallback(
    (values: [Moment, Moment], formatString: [string, string]) => {
      onChange(undefined, [values[0]?.startOf("day"), values[1]?.endOf("day")]);
    },
    [onChange]
  );

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
      }
    },
    [disabled]
  );

  const handleCloseAdvanceFilterMaster = React.useCallback(() => {
    setExpand(false);
    setExpandDate(false);
  }, []);

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
    onChange(null, value);
  }, [onChange, value]);

  CommonService.useClickOutside(wrapperRef, handleCloseAdvanceFilterMaster);

  const handleClearItem = React.useCallback(() => {
    onChange(null, [null, null]);
  }, [onChange]);

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
              {title}
              <i className="filter__icon tio-chevron_down"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="select__input" onClick={handleToggle}>
          <InputSelect
            model={activeItem} // value of input, event should change these on update
            render={render}
            placeHolder={placeHolderSelect}
            expanded={isExpand}
            disabled={disabled}
            onClear={handleClearItem}
            type={inputType}
            label={title}
            isSmall={isSmall}
          />
        </div>
      )}

      {isExpand && (
        <div
          id="list-container"
          className="date-range-filter-master__list-container m-t--xxxs"
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
                >
                  <span className="advance-date-range-filter__text">
                    {render(item)}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={classNames("date-range-master__prefer-option p--xs", {
              "date-range-master__bg-primary": activeItem === undefined,
            })}
            onClick={handleClickCustomDate}
          >
            <Calendar16 />
            <span>Custom date</span>
          </div>
          {isExpandDate && (
            <>
              <DateRange
                {...props}
                type={typeCustomDate}
                isSmall={isSmall}
                onChange={handleChange}
                value={internalValue}
                getPopupContainer={() =>
                  document.getElementById("list-container")
                }
                placeHolder={placeholder}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

AdvanceDateRangeFilter.defaultProps = {
  isMaterial: false,
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  placeHolder: "Chọn ngày",
  render: defaultRenderObject,
  type: ADVANCE_DATE_RANGE_TYPE.SHORT,
  placeHolderSelect: "",
};

export default AdvanceDateRangeFilter;
