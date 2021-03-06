export function setItemToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getItemFromLocalStorage<T>(key: string): T {
  const item: string = localStorage.getItem(key);
  if(item !== undefined && item !== "") return JSON.parse(localStorage.getItem(key));
  else return null;
}

export function removeItemFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export const UI_STORE_KEY = 'ui';