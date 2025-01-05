export const createSlug = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove accents/diacritics
    .trim() // Remove whitespace from both ends
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};
