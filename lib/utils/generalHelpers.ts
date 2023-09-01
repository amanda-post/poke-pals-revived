export const isEmpty = (item: any) => {
  if (item === null || item === undefined) {
    return true;
  }
  if (Array.isArray(item) || typeof item === 'string') {
    return item.length === 0;
  }
  if (typeof item === 'object') {
    return Object.keys(item).length === 0;
  }
  return false;
};

export const usernameExists = async (username: string) => {
  const response = await fetch(`/api/user/username/${username}`);
  const usernameMatch = await response.json();
  return usernameMatch;
};
