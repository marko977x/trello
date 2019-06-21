export function isEmpty(object: any): boolean {
  if (Object.entries(object).length == 0) return true;
  return false;
}