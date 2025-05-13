export function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let dayCounter = 1;

  let firstWeek = new Array(7).fill(null);
  for (let i = firstDay; i < 7; i++) {
    firstWeek[i] = dayCounter++;
  }
  weeks.push(firstWeek);

  while (dayCounter <= lastDate) {
    let week = new Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= lastDate; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }

  return weeks;
}
