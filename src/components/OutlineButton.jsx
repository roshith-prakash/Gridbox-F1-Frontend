import PropTypes from "prop-types";

// Styled button - button with shadow
const OutlineButton = ({
  text,
  onClick,
  disabled,
  disabledText = "Please Wait...",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="min-w-14 flex justify-center font-medium shadow-md py-2 px-5 rounded-lg w-full text-ink active:shadow transition-all disabled:text-greyText hover:scale-105"
    >
      {disabled ? disabledText : text}
    </button>
  );
};

OutlineButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
  disabledText: PropTypes.string,
  onClick: PropTypes.func,
};

export default OutlineButton;
