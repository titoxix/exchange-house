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

  let monthString = month.toString();

  if (month < 10) {
    monthString = `0${month}`;
  }

  if (format === "dd-mm-yyyy") return `${day}-${monthString}-${year}`;

  return `${year}-${monthString}-${day}`;
};

/**
 * Format a date to the format dd-mm-yyyy
 * @param {Date} date - The date to format
 * @returns {string} - The date formatted as dd-mm-yyyy
 */
export const formatDateLatam = (date: Date): string => {
  return date.toISOString().split("T")[0].split("-").reverse().join("-");
};

/**
 * Get the current date in the format dd-mm-yyyy with month name
 * @returns {string} - Current date in the format: 01 Oct 2021
 */
export const getCurrentDateMontName = (): string => {
  const currentDate = new Date();
  const splitedDate = currentDate.toDateString().split(" ");
  return `${splitedDate[2]} ${splitedDate[1]}. ${splitedDate[3]}`;
};
