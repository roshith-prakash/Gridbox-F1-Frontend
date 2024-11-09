import PropTypes from "prop-types";

// Styled Text input
const Input = ({ value, placeholder, onChange, className = "" }) => {
  return (
    <input
      type="text"
      className={`border-b-2 placeholder:text-greyText w-full py-2 min-h-8 mt-3 focus:outline-none ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
