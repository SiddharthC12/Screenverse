/**
 * SCREENVERSE – Formatting Utilities
 */

/**
 * Format rating to one decimal place
 * @param {number|string} rating 
 * @returns {string} e.g. "8.5"
 */
export const formatRating = (rating) => {
  const num = Number(rating);
  if (isNaN(num)) return 'N/A';
  return num.toFixed(1);
};

/**
 * Convert 10-point rating to 5-star representation
 * @param {number|string} rating 
 * @returns {number} 1.0 - 5.0
 */
export const toStarRating = (rating) => {
  const num = Number(rating);
  if (isNaN(num)) return 0;
  return Math.round((num / 2) * 10) / 10;
};

/**
 * Format date string into human-readable format
 * @param {string|Date} dateString 
 * @returns {string} e.g. "Nov 22, 2025"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format movie duration into "Xh Ym"
 * @param {number} minutes 
 * @returns {string}
 */
export const formatRuntime = (minutes) => {
  if (!minutes || isNaN(minutes)) return '';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};
