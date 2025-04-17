import React, { useState } from "react";
import Dropdown from "./Dropdown"; 

const BirthDateSelector = ({ onChange }) => {
  const years = Array.from({ length: 100 }, (_, i) => (2025 - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"));

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const updateParent = (year, month, day) => {
    if (onChange) {
      onChange({ year, month, day });
    }
  };

  const handleSelect = (type, value) => {
    let year = selectedYear, month = selectedMonth, day = selectedDay;

    if (type === "year") {
      year = value;
      setSelectedYear(value);
    } else if (type === "month") {
      month = value;
      setSelectedMonth(value);
    } else if (type === "day") {
      day = value;
      setSelectedDay(value);
    }

    updateParent(year, month, day);
  };

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", fontFamily: "Pretendard-Regular" }}>
      <Dropdown
        items={years}
        selectedItem={selectedYear}
        setSelectedItem={(v) => handleSelect("year", v)}
        placeholder="2020"
      />년
      <Dropdown
        items={months}
        selectedItem={selectedMonth}
        setSelectedItem={(v) => handleSelect("month", v)}
        placeholder="01"
      />월
      <Dropdown
        items={days}
        selectedItem={selectedDay}
        setSelectedItem={(v) => handleSelect("day", v)}
        placeholder="01"
      />일
    </div>
  );
};

export default BirthDateSelector;
