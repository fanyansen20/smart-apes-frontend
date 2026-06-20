export const filterNumberOnly = (char) => {
  const numberRegex = /^[0-9]*$/g;

  if (char === "") return char;

  if (numberRegex.test(char)) return Number(char);
};
