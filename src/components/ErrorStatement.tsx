import * as PropTypes from "prop-types";

// Component to display errors
const ErrorStatement = ({ text }) => {
  return <p className="mt-1 text-sm text-red-500 dark:text-red-300">{text}</p>;
};

ErrorStatement.propTypes = {
  text: PropTypes.string,
};

export default ErrorStatement;
