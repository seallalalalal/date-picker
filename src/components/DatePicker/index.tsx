import React, { use, useState } from "react";
import moment, { Moment } from "moment";
import { DatePickerProps } from "@/types/datePicker";
import DayButton from "../UI/DayButton";
import MonthButton from "../UI/MonthButton";
import { useDateLogic } from "@/hooks/useDateLogic";

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
  const {
    currentMonth,
    getDaysInMonth,
    goToNextMonth,
    goToPreviousMonth,
    isDateInRange,
    formattedMonth,
    formattedDay,
  } = useDateLogic({
    startDate: props.startDate,
    endDate: props.endDate,
    monthFormat,
    dayFormat,
  });

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

  const renderHeader = () => (
    <div className="flex justify-between items-center w-[350px] h-[44px] mb-4">
      <MonthButton
        disabled={disabledOnClickPreviousMonth}
        onClick={() => goToPreviousMonth()}
      >
        {"<"}
      </MonthButton>
      <div>{formattedMonth()}</div>
      <MonthButton
        disabled={
          moment().isSame(currentMonth, "month") && disabledOnClickNextMonth
        }
        onClick={() => goToNextMonth()}
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
        {getDaysInMonth().map((day, index) => {
          const isCurrentMonth = day.isSame(currentMonth, "month");
          const isToday = day.isSame(moment(), "day");
          console.log({
            startDate: props.startDate,
            endDate: props.endDate,
            isBetween: isDateInRange(day),
          });
          const isActive =
            day.isSame(props.startDate) ||
            (!!props.endDate && isDateInRange(day));

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
              {formattedDay(day)}
            </DayButton>
          );
        })}
      </div>
    );
  };

  const header = () =>
    props.headerRenderer?.(currentMonth, goToPreviousMonth, goToNextMonth) ??
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
