// Next
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Lib
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// MUI
import { Button, Divider } from "@mui/material";

// Assets
import CalendarIcon from "public/assets/icons/calendar.svg";

// Constant
const INITIAL_DATE = [
  {
    startDate: null,
    endDate: null,
    key: "selection",
  },
];

const DateRangePickerComp = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [datePicker, setDatePicker] = useState(INITIAL_DATE);
  const calendarRef = useRef(null);

  // Handle view calendar
  const handleViewCalendar = () => {
    setShowCalendar((current) => !current);
  };

  // Handle select date
  const handleSelectDate = (item) => {
    setDatePicker([item.selection]);
  };

  // Handle clear date
  const handleClearDate = async () => {
    setDatePicker(INITIAL_DATE);
  };

  // Handle confirm date
  const handleConfirmDate = async () => {
    setShowCalendar(false);
  };

  useEffect(() => {
    const handleClickOutsideCalendar = (e) => {
      if (calendarRef?.current && !calendarRef?.current?.contains(e?.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideCalendar);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCalendar);
    };
  }, [calendarRef]);

  return (
    <div className="datepickerButton" ref={calendarRef}>
      <Button
        onClick={handleViewCalendar}
        variant="outlined"
        className="datepickerDisplay"
      >
        <Image src={CalendarIcon} alt="calendar" />
        {datePicker[0]?.startDate && datePicker[0]?.endDate
          ? format(datePicker[0].startDate, "dd/MM/yyyy") +
            " - " +
            format(datePicker[0].endDate, "dd/MM/yyyy")
          : "DD/MM/YYYY - DD/MM/YYYY"}
      </Button>
      <div
        className="datepickerComponent"
        style={{ visibility: showCalendar ? "visible" : "hidden" }}
      >
        <DateRangePicker
          color="#7e54f1"
          rangeColors={["#7e54f1"]}
          onChange={(item) => handleSelectDate(item)}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          months={2}
          ranges={datePicker}
          direction="horizontal"
        />
        <Divider />
        <div>
          <Button
            variant="contained"
            sx={{
              margin: "1em 1em 1em",
              fontSize: "10px",
              fontFamily: ['"Poppins"', "Roboto"].join(","),
              fontWeight: "700",
              color: "#7E54F1",
              backgroundColor: "#FFF",
              textTransform: "none",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#FFF",
              },
            }}
            onClick={handleClearDate}
          >
            Clear Date
          </Button>
          <Button
            variant="contained"
            sx={{
              margin: "1em 1em 1em",
              fontSize: "10px",
              fontFamily: ['"Poppins"', "Roboto"].join(","),
              fontWeight: "700",
              color: "#FFF",
              backgroundColor: "#7E54F1",
              textTransform: "none",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#7E54F1",
              },
            }}
            onClick={handleConfirmDate}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerComp;
