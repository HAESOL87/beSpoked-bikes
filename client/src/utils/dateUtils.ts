// Utility functions for consistent date handling across the application
// Helps avoid timezone issues when displaying and managing dates

/**
 * Formats a date string for display, avoiding timezone issues
 * @param dateStr - Date string in various formats (YYYY-MM-DD, YYYY-MM-DDTHH:mm:ss, etc.)
 * @returns Formatted date string for display
 */
export const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return '';

  // If it's just a date string (YYYY-MM-DD), parse it as local date
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
  }

  // If it has time component, split at T and take just the date part
  if (dateStr.includes('T')) {
    const [datePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
  }

  // Fallback to normal parsing
  return new Date(dateStr).toLocaleDateString();
};

/**
 * Formats a date string for form input (date type)
 * @param dateStr - Date string in various formats
 * @returns Date string in YYYY-MM-DD format for date inputs
 */
export const formatDateForInput = (dateStr: string): string => {
  if (!dateStr) return '';

  // If it has time component, split at T and take just the date part
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0];
  }

  // If it's already in YYYY-MM-DD format, use as is
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }

  // Parse the date and format it as YYYY-MM-DD
  try {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  } catch {
    return '';
  }
};

/**
 * Formats a date from form input for backend submission
 * @param dateStr - Date string from date input (YYYY-MM-DD)
 * @returns Date string with time component for backend consistency
 */
export const formatDateForBackend = (dateStr: string): string => {
  if (!dateStr) return '';

  // Add time component for consistency
  return dateStr.match(/^\d{4}-\d{2}-\d{2}$/)
    ? `${dateStr}T00:00:00`
    : dateStr;
}; 