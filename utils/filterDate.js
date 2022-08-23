import { useTime } from "../hooks";

export const useFilterDate = () => {
  const format = useTime();
  const currentDate = new Date();

  const filterDate = arr => {
    console.log(arr);
    // filter by current day
    const today = arr.filter(data => {
      const date = new Date(format(data.created_at).date);

      return date.getDate() == currentDate.getDate();
    });

    // filter by week
    const currentWeek = arr.filter(data => {
      const firstDay = currentDate.getDate() - currentDate.getDay();
      const lastDay = firstDay + 6;
      const date = new Date(format(data.created_at).date);

      return date.getDate() >= firstDay && date.getDate() <= lastDay;
    });

    // filter by current month
    const currentMonth = arr.filter(data => {
      const date = new Date(format(data.created_at).date);

      return date.getMonth() == currentDate.getMonth();
    });

    return {
      today: today,
      week: currentWeek,
      month: currentMonth,
    };
  };

  return filterDate;
};
