// Year Picker
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import PropTypes from "prop-types";

const YearPicker = ({ setYear, setInvalidYear }) => {
  // To set the year using DatePicker
  const changeDate = (date) => {
    // Invalid date (first season is 1950 and last maintained season is 2024)
    if (
      new Date(date._d).getFullYear() > 2024 ||
      new Date(date._d).getFullYear() < 1950
    ) {
      console.log("Invalid Year");
      setInvalidYear(true);
    }
    // Valid Date
    else {
      setYear(new Date(date._d).getFullYear());
      setInvalidYear(false);
    }
  };

  return (
    <Datetime
      dateFormat="YYYY"
      timeFormat={false}
      inputProps={{
        placeholder: "YYYY",
        className:
          "bg-transparent text-center placeholder:text-center outline-none w-full py-2",
      }}
      onChange={(date) => {
        changeDate(date);
      }}
      closeOnSelect
      className="text-center border-2 border-black/50 rounded outline-none"
    />
  );
};

YearPicker.propTypes = {
  setYear: PropTypes.func,
  setInvalidYear: PropTypes.func,
};

export default YearPicker;
