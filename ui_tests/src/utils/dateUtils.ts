/**
 * Utilities for date/time formatting used by UI tests.
 */
/**
 * Returns a formatted date/time string equal to current time plus the specified minutes.
 * Format: MM/DD/YYYY hh:mm AM/PM  (e.g. "11/01/2025 12:33 AM")
 * @param minutesToAdd number of minutes to add to the current time (default 1)
 */
export function getDateTimePlusMinutes(minutesToAdd = 1): string {
  const d = new Date(Date.now() + minutesToAdd * 60_000);

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  const hours24 = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  return `${month}/${day}/${year} ${hours12}:${minutes} ${ampm}`;
}

// Backwards-compatible alias for callers that used the original function name.
export const getDateTimePlusOneMinute = (): string => getDateTimePlusMinutes(1);

export default { getDateTimePlusMinutes, getDateTimePlusOneMinute };
