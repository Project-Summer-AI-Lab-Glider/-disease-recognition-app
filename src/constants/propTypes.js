import PropTypes from "prop-types";
import { PATIENT_CODE_REGEX } from "./constants";

const CodeProp = function (props, propName, componentName) {
  if (
    !PATIENT_CODE_REGEX.test(
      // eslint-disable-next-line react/destructuring-assignment
      props[propName]
    )
  ) {
    return new Error(
      `Invalid Code: \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`
    );
  }
  return null;
};

const Patient = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  bmi: PropTypes.number.isRequired,
  diagnosis: PropTypes.arrayOf(PropTypes.string),
  medicines: PropTypes.arrayOf(PropTypes.string),
  hospitalization_times: PropTypes.number,
  pesel: PropTypes.string.isRequired,
  date_of_birth: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  person_authorized: PropTypes.string.isRequired,
  phone_authorized: PropTypes.string.isRequired,
  guardianship: PropTypes.bool.isRequired,
  first_hospitalization: PropTypes.string,
  code: CodeProp,
});

export default Patient;
