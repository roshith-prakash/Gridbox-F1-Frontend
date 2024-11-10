import PropTypes from "prop-types";

const CTAButton = ({
  disabled = false,
  className = "",
  text = "Click Me",
  disabledText = "",
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={`bg-cta border-cta text-white min-w-14 py-2 px-5 shadow rounded-xl w-full md:w-fit hover:bg-hovercta hover:scale-105 hover:border-hovercta disabled:bg-cta/70 transition-all ${className}`}
      onClick={onClick}
    >
      {disabled ? (disabledText.length > 0 ? disabledText : text) : text}
    </button>
  );
};

CTAButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
  disabledText: PropTypes.string,
  onClick: PropTypes.func,
};

export default CTAButton;
