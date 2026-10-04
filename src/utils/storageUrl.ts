const storageBaseUrl = import.meta.env.VITE_STORAGE_BASE_URL ||
  'http://localhost:9000/my-app-storage';

export const resolveStorageUrl = (path?: string | null): string => {
  if (!path) return '';
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  return `${storageBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};
