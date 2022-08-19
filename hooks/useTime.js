export const useTime = () => {
  const format = value => {
    const date = new Date(value.slice(0, 10)).toLocaleDateString("en-GB"); // DD/MM/YYYY
    const time = value.slice(11, 16); // HH.MM

    return {
      date: date,
      time: time,
    };
  };

  return format;
};
