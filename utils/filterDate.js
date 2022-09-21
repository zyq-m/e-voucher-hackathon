import moment from "moment";

export const useFilterDate = () => {
  const currentDate = moment();
  const dateFormat = "D-MM-YY";

  const filterDate = arr => {
    // filter by current day
    const today = arr.filter(data => {
      const date = moment(data.created_at).format(dateFormat);

      return date == currentDate.format(dateFormat);
    });

    // filter by current week
    const currentWeek = arr.filter(data => {
      const firstDay = currentDate.startOf("week").day("Thursday").date();
      const lastDay = currentDate.endOf("week").day("Friday").date();
      const date = moment(data.created_at).date();

      return date >= firstDay && date <= lastDay;
    });

    // filter by current month
    const currentMonth = arr.filter(data => {
      const date = moment(data.created_at).month();

      return date == currentDate.month();
    });

    return {
      today: today,
      week: currentWeek,
      month: currentMonth,
    };
  };

  return filterDate;
};
