import React, { useState } from "react";
import moment, { Moment } from "moment";
import { DatePickerProps } from "@/types/datePicker";
import DayButton from "../UI/DayButton";
import MonthButton from "../UI/MonthButton";

function DatePicker({
  mode = "single",
  disabledOnClickNextMonth = true,
  disabledOnClickPreviousMonth = false,
  defaultHightlightToday = true,
  showDaysOfWeek = true,
  dayFormat = "D日",
  monthFormat = "YYYY年MM月",
  disabledTodayAfter = false,
  ...props
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment());

  const startDate = currentMonth.clone().startOf("month").startOf("week");
  const endDate = currentMonth.clone().endOf("month").endOf("week");
  // get days of current month
  function getDays() {
    const _startDay = startDate.clone();
    const _days: Moment[] = [];
    while (_startDay.isBefore(endDate)) {
      _days.push(_startDay.clone());
      _startDay.add(1, "day");
    }
    return _days;
  }
  function handleDaySelect(newDate: Moment) {
    if (!props.startDate) {
      props.onChange(newDate.startOf("day"), props.endDate);
    } else if (!props.endDate) {
      if (newDate.isBefore(props.startDate)) {
        props.onChange(newDate.startOf("day"), props.startDate.endOf("day"));
      } else {
        props.onChange(props.startDate, newDate.endOf("day"));
      }
    } else {
      props.onChange(newDate.startOf("day"), undefined);
    }
  }
  function onClickPrevMonth() {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  }
  function onClickNextMonth() {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  }
  const renderHeader = () => (
    <div className="flex justify-between items-center w-[350px] h-[44px] mb-4">
      <MonthButton
        disabled={disabledOnClickPreviousMonth}
        onClick={() => onClickPrevMonth()}
      >
        {"<"}
      </MonthButton>
      <div>{currentMonth.format(monthFormat)}</div>
      <MonthButton
        disabled={
          moment().isSame(currentMonth, "month") && disabledOnClickNextMonth
        }
        onClick={() => onClickNextMonth()}
      >
        {">"}
      </MonthButton>
    </div>
  );

  const renderDaysOfWeek = () => {
    const daysOfWeek = moment.weekdaysShort();
    return (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
    );
  };
  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 h-full">
        {getDays().map((day, index) => {
          const isCurrentMonth = day.isSame(currentMonth, "month");
          const isToday = day.isSame(moment(), "day");
          console.log({
            startDate: props.startDate,
            endDate: props.endDate,
            isBetween: day.isBetween(props.startDate, props.endDate),
          });
          const isActive =
            day.isSame(props.startDate) ||
            (!!props.endDate && day.isBetween(props.startDate, props.endDate));

          if (!!props.dayRenderer) {
            return props.dayRenderer(day, isActive);
          }
          return (
            <DayButton
              onClick={() => handleDaySelect(day)}
              isActive={isActive}
              isHighlight={isToday && defaultHightlightToday}
              key={index}
              disabled={
                disabledTodayAfter
                  ? day.isAfter(moment(), "day")
                  : !isCurrentMonth
              }
            >
              {day.format(dayFormat)}
            </DayButton>
          );
        })}
      </div>
    );
  };

  const header = () =>
    props.headerRenderer?.(currentMonth, onClickPrevMonth, onClickNextMonth) ??
    renderHeader();
  const daysOfWeek = () => (!!showDaysOfWeek ? renderDaysOfWeek() : null);

  return (
    <div className={props.className ?? "w-[350px] h-[240px]"}>
      {header()}
      {daysOfWeek()}
      {renderDays()}
    </div>
  );
}

export default DatePicker;
