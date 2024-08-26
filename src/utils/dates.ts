type DateFormat = "dd-mm-yyyy" | "yyyy-mm-dd";

/**
 * Get the current date in the format yyyy-mm-dd
 * @param {DateFormat} format - The format of the date
 * @returns {string} - Current date in the format yyyy-mm-dd
 */
export const getCurrentDate = (format: DateFormat): string => {
  const currentDate = new Date();
  const day = currentDate.getUTCDate();
  let month = currentDate.getUTCMonth() + 1;
  const year = currentDate.getUTCFullYear();

  let monthString = day.toString();

  if (month < 10) {
    monthString = `0${month}`;
  }

  if (format === "dd-mm-yyyy") return `${day}-${monthString}-${year}`;

  return `${year}-${monthString}-${day}`;
};
