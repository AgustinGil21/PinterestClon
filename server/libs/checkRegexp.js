export const checkRegexp = ({ regexp, value, emptyStr = false }) => {
  let result;

  if (emptyStr) {
    result = regexp.test(value) || value === '';
  } else {
    result = regexp.test(value);
  }

  return result;
};
