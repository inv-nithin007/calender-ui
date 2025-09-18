
export function getTimeSlot(fromDate, diff, cellId) {
  const timeIndex = Math.floor((cellId - 1) / diff);
  const dayIndex = (cellId - 1) % diff;

  const startHour = 8 + Math.floor(timeIndex / 2);
  const startMinute = (timeIndex % 2) * 30;
  const endHour = startMinute === 0 ? startHour : startHour + 1;
  const endMinute = startMinute === 0 ? 30 : 0;

  const timeStart = `${startHour}:${startMinute === 0 ? '00' : '30'}`;
  const timeEnd = `${endHour}:${endMinute === 0 ? '00' : '30'}`;

  const currentDate = new Date(fromDate);
  currentDate.setDate(currentDate.getDate() + dayIndex);
  const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${dateStr} ${timeStart}-${timeEnd}`;
}
