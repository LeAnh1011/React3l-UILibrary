import { DatePickerProps } from "antd/lib/date-picker";
import DatePicker from "components/Calendar/DatePicker";
import { BORDER_TYPE } from "config/enum";
import moment, { Moment } from "moment";
import React from "react";
import { CommonService } from "services/common-service";

interface DatePickerAction {
  name?: string;
  action?: any;
}

interface AdvanceFilterDateProps {
  value?: Moment;
  label?: string;
  isMaterial?: boolean;
  dateFormat?: string[];
  error?: string;
  onChange?: (value: Moment | [Moment, Moment] | null, dateString?: string) => void;
  type?: BORDER_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  action?: DatePickerAction;
  placeHolder?: string;
}

function AdvanceFilterDate(
  props: AdvanceFilterDateProps & DatePickerProps
) {
  const { value, dateFormat, onChange } = props;

  const internalValue = React.useMemo(() => {
    return typeof value === "string"
      ? CommonService.toMomentDate(value)
      : value;
  }, [value]);

  const handleChangeDate = React.useCallback(
    (date: Moment, dateString: string) => {
      if (date) {
        const startOfDay = moment(date).startOf("day");
        const endOfDay = moment(date).endOf("day");
        onChange([startOfDay, endOfDay], dateString);
      } else {
        onChange([null, null], dateString);
      }

    },
    [onChange]
  );
  return (
    <div className="advance-filter-date__container">
      <DatePicker
        {...props}
        value={internalValue}
        style={{ width: "100%" }}
        allowClear={false}
        format={dateFormat}
        onChange={handleChangeDate}
      />
    </div>
  );
}

AdvanceFilterDate.defaultProps = {
  dateFormat: "DD/MM/YYYY",
  label: "",
  isSmall: false,
  type: BORDER_TYPE.BORDERED,
  isRequired: false,
  disabled: false,
  className: "",
};

export default AdvanceFilterDate;
