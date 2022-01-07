import { RangePickerProps } from "antd/lib/date-picker";
import DateRange from "components/Calendar/DateRange";
import { BORDER_TYPE } from "config/enum";
import { Moment } from "moment";
import React from "react";
import { CommonService } from "services/common-service";

interface DateRangeAction {
  name?: string;
  action?: any;
}
interface AdvanceDateRangeFilterProps {
  label?: string;
  value: [Moment, Moment];
  open?: boolean;
  dateFormat?: string[];
  onChange?: (value: [Moment, Moment], dateString?: [string, string]) => void;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  action?: DateRangeAction;
  placeHolder?: [string, string];
}

function AdvanceDateRangeFilter(
  props: AdvanceDateRangeFilterProps & RangePickerProps
) {
  const { value, onChange } = props;

  const internalValue: [Moment, Moment] = React.useMemo(() => {
    return [
      typeof value[0] === "string"
        ? CommonService.toMomentDate(value[0])
        : value[0],
      typeof value[1] === "string"
        ? CommonService.toMomentDate(value[1])
        : value[1],
    ];
  }, [value]);

  const handleChange = React.useCallback(
    (values: [Moment, Moment]) => {
      if (values[0]) {
        onChange([values[0].startOf("day"), values[1].endOf("day")]);
      } else {
        onChange([null, null]);
      }

    },
    [onChange]
  );

  return (
    <div className="advance-date-range-filter__container">
      <DateRange
        {...props}
        label="Ngày nhập hàng"
        onChange={handleChange}
        value={internalValue}
      />
    </div>
  );
}

AdvanceDateRangeFilter.defaultProps = {
  dateFormat: ["DD/MM/YYYY", "YYYY/MM/DD"],
  placeHolder: ["Từ ngày", "Đến ngày"],
};

export default AdvanceDateRangeFilter;
