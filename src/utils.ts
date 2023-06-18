import { IJoke } from "./pages/types";

export interface MyObject {
  [key: string]: string;
}

export const orderObject = (obj: IJoke, keysOrder: string[]): MyObject => {
  const ordered: MyObject = {};
  keysOrder.forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      ordered[key] = obj[key];
    }
  });
  return ordered;
}


export const createNumberArray = (start: number, end: number): number[] => {
  const result: number[] = []

  for (let i = start; i <= end; i++) {
    result.push(i)
  }

  return result
}


export const lowercaseObjectKeys = (obj: IJoke) => {
  const keys = Object.keys(obj);
  const lowercasedObj = {};

  for (let i = 0; i < keys.length; i++) {
    lowercasedObj[keys[i].toLowerCase()] = obj[keys[i]];
  }

  return lowercasedObj;
}


export const compareArrays = (arr1: unknown[], arr2: unknown[]) => {
  const matchIndices: string[] = [];
  arr1.forEach((item, index) => {
    if (arr2.includes(item)) {
      matchIndices.push(index);
    }
  });

  for (let i = matchIndices.length - 1; i >= 0; i--) {
    arr1.splice(matchIndices[i], 1);
  }

  return arr1;
}