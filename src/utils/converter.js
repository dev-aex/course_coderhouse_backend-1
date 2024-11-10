const convertToBool = (value) => {
  const trueValues = ["verdadero", "true", "on", "yes", "1", 1, true];
  return trueValues.includes(value);
};

export { convertToBool }