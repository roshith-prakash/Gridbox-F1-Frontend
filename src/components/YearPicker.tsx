import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import * as PropTypes from "prop-types";

const YearPicker = ({ setYear, setInvalidYear, className = "", year }) => {
  // To set the year using DatePicker
  const changeDate = (date) => {
    // Invalid date (first season is 1950)
    if (
      new Date(date._d).getFullYear() > new Date().getFullYear() ||
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
    // DatePicker component
    <Datetime
      // Format to allow only years as input
      dateFormat="YYYY"
      timeFormat={false}
      inputProps={{
        placeholder: String(year),
        className:
          "bg-transparent text-center dark:text-white placeholder:text-center outline-none w-full py-2",
      }}
      onChange={(date) => {
        changeDate(date);
      }}
      // To close pop-out menu when a year is selected
      closeOnSelect
      className={`w-fit text-center border-2 dark:text-black border-black/50 dark:border-darkmodetext rounded outline-none ${className}`}
    />
  );
};

YearPicker.propTypes = {
  setYear: PropTypes.func,
  setInvalidYear: PropTypes.func,
  className: PropTypes.string,
};

export default YearPicker;
