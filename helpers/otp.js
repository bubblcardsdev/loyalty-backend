function genOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

const nowPlusMinutes = (minutes) =>
  new Date(Date.now() + minutes * 60 * 1000);


export { genOtp, nowPlusMinutes };