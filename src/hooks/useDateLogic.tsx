import { useState, useCallback } from "react";
import moment, { Moment } from "moment";

interface UseDateLogicProps {
  startDate?: Moment;
  endDate?: Moment;
  dayFormat: string;
  monthFormat: string;
}

export function useDateLogic({
  startDate,
  endDate,
  dayFormat,
  monthFormat,
}: UseDateLogicProps) {
  const [currentMonth, setCurrentMonth] = useState(
    moment(startDate || undefined)
  );

  const getDaysInMonth = useCallback(() => {
    const firstDay = currentMonth.clone().startOf("month").startOf("week");
    const lastDay = currentMonth.clone().endOf("month").endOf("week");
    const days = [];

    for (let day = firstDay; day.isSameOrBefore(lastDay); day.add(1, "day")) {
      days.push(day.clone());
    }

    return days;
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  }, []);

  const isDateInRange = useCallback(
    (date: Moment) => {
      if (!startDate || !endDate) return false;
      return date.isBetween(startDate, endDate, "day", "[]");
    },
    [startDate, endDate]
  );

  const formattedMonth = useCallback(() => {
    return currentMonth.format(monthFormat);
  }, [currentMonth, monthFormat]);

  const formattedDay = useCallback(
    (day: Moment) => {
      return day.format(dayFormat);
    },
    [dayFormat]
  );

  return {
    currentMonth,
    getDaysInMonth,
    goToNextMonth,
    goToPreviousMonth,
    isDateInRange,
    formattedMonth,
    formattedDay,
  };
}
