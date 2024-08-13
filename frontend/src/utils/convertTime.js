export const convertTime = (time) => {
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  let minutest = parseInt(timeParts[1]);
  let mdian = "AM";

  if (hours >= 12) {
    mdian = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  return (
    hours.toString().padStart(2) + ":"+ minutest.toString().padStart(2, "0") + " "+ mdian
  );
};
