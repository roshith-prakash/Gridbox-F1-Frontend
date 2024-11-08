import PropTypes from "prop-types";

const CTAButton = ({
  disabled = false,
  className = "",
  text = "Click Me",
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={`bg-cta border-cta min-w-32 text-white rounded-lg px-6 py-2 hover:scale-105 hover:bg-hovercta hover:border-hovercta transition-all disabled:bg-cta/65 disabled:border-cta/45 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

CTAButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default CTAButton;
