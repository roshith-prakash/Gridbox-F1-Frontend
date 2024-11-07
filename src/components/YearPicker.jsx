// Year Picker
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import PropTypes from "prop-types";

const YearPicker = ({ setYear, setOpen }) => {
  // To set the year using DatePicker
  const changeDate = (date) => {
    // Invalid date (first season is 1950 and last maintained season is 2024)
    if (
      new Date(date._d).getFullYear() > 2024 ||
      new Date(date._d).getFullYear() < 1950
    ) {
      console.log("Invalid Year");
      setOpen(true);
    }
    // Valid Date
    else {
      setYear(new Date(date._d).getFullYear());
      setOpen(false);
    }
  };

  return (
    <Datetime
      dateFormat="YYYY"
      timeFormat={false}
      inputProps={{ placeholder: 2024 }}
      onChange={(date) => {
        changeDate(date);
      }}
      closeOnSelect
      className="text-center border-2 rounded p-1 outline-none"
    />
  );
};

YearPicker.propTypes = {
  setYear: PropTypes.func,
  setOpen: PropTypes.func,
};

export default YearPicker;
