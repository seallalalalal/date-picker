import { Inter } from "next/font/google";
import DatePicker from "@/components/DatePicker";
import { Moment } from "moment";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedStartDate, setSelectedStartDate] = useState<Moment>();
  const [selectedEndDate, setSelectedEndDate] = useState<Moment>();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-white`}
    >
      <DatePicker
        mode="range"
        // future feature:
        // mode="single"
        onChange={(startDate, endDate) => {
          setSelectedStartDate(startDate);
          setSelectedEndDate(endDate);
        }}
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        disabledOnClickNextMonth
        showDaysOfWeek={false}
        // dayRenderer={(day, isActive) => {
        //   return <div className="bg-yellow-200">{day.format("D")}</div>;
        // }}
        // headerRenderer={(month, onClickPrevMonth, onClickNextMonth) => {
        //   return (
        //     <div className="flex flex-row">
        //       <button onClick={() => onClickPrevMonth()}>{"<"}</button>
        //       <div className="flex-1 text-center">
        //         {month.format("YYYY/MM")}
        //       </div>
        //       <button onClick={() => onClickNextMonth()}>{">"}</button>
        //     </div>
        //   );
        // }}
        // dayFormat="D"
        // monthFormat="YYYY/MM"
        // disabledTodayAfter
        // disabledPreviousMonth
        // defaultHightlightToday={false}
      />
      <div>
        <div>Start Date: {selectedStartDate?.format("YYYY/MM/DD")}</div>
        <div>End Date: {selectedEndDate?.format("YYYY/MM/DD")}</div>
      </div>
    </main>
  );
}
