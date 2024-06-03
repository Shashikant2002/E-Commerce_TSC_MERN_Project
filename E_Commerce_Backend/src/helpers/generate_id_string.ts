const generateRandomHexString = () => {
  let result = "";
  const characters = "0123456789abcdef";

  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
export default generateRandomHexString;
