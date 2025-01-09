import * as PropTypes from "prop-types";

// Div to display data unavailable / Server Error.
const ErrorDiv = ({
  text = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="max-w-[95%] text-center text-xl italic px-8 h-40 py-3 border-2 rounded-lg shadow-lg w-fit flex items-center justify-center">
      {text}
    </div>
  );
};

ErrorDiv.propTypes = {
  text: PropTypes.string,
};

export default ErrorDiv;
