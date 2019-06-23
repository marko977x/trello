import { isObject } from 'util';

export function isEmpty(object: any): boolean {
  if(isObject(object)) {
    if (Object.entries(object).length == 0) return true;
    else return false;
  }
  else {
    if(object == null || object == undefined || object == "") return true;
    else return false;
  }
}