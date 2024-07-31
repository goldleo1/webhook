const pad = (num) => String(num).padStart(2, "0");
module.exports = {
  time2hms: (time = new Date()) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  },
  time2day: (time = new Date()) => {
    const month = time.getMonth() + 1;
    const date = time.getDate();
    return `${pad(month)}-${pad(date)}`;
  },
};
