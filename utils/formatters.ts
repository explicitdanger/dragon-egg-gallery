/**
 * Formats a dragon name for use in URLs by:
 * 1. Converting to lowercase
 * 2. Replacing spaces with underscores
 * 3. Removing special characters
 * 4. Encoding remaining special characters
 */
export function formatDragonNameForUrl(name: string): string {
  return name
    .toLowerCase()
    // Replace & with 'and'
    .replace(/&/g, 'and')
    // Replace spaces and special characters with underscore
    .replace(/[\s\-]+/g, '_')
    // Remove any other special characters
    .replace(/[^a-z0-9_]/g, '')
    // Replace multiple underscores with single underscore
    .replace(/_+/g, '_')
    // Remove leading/trailing underscores
    .trim()
    .replace(/^_+|_+$/g, '');
}

/**
 * Formats a dragon name for display by:
 * 1. Converting underscores to spaces
 * 2. Capitalizing first letter of each word
 */
export function formatDragonNameForDisplay(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
} 