import { Moment } from "moment";
type DatePickerProps = SingelDatePickerProps | RangeDatePickerProps;
interface SingelDatePickerProps extends SharedDatePickerProps {
  mode: "single";
  onChange: (date: Moment | undefined) => void;
}

interface RangeDatePickerProps extends SharedDatePickerProps {
  mode: "range";
  onChange: (
    startDate: Moment | undefined,
    endDate: Moment | undefined
  ) => void;
}

interface SharedDatePickerProps {
  // onChange: (
  //   startDate: Moment | undefined,
  //   endDate: Moment | undefined
  // ) => void;
  startDate: Moment | undefined;
  endDate: Moment | undefined;
  className?: string;
  disabledOnClickNextMonth?: boolean; // default false
  disabledOnClickPreviousMonth?: boolean; // default false
  disabledTodayAfter?: boolean; // default false
  dayRenderer?: (date: Moment, isActive: boolean) => React.ReactNode;
  headerRenderer?: (
    date: Moment,
    onClickPrev: () => void,
    onClickNext: () => void
  ) => React.ReactNode;
  monthFormat?: string;
  dayFormat?: string;
  defaultHightlightToday?: boolean; // default true
  showDaysOfWeek?: boolean; // default true
  // TODOs:
  //   mode?: "single" | "range"; // default single
  //   disabledDays?: Moment[];
  //   defaultHighlightDays?: Moment[];
  //   locale?: string;
}
