import { IJoke } from "./pages/types";


export const baseUrl = '/acid-jokes/'
export interface MyObject {
  [key: string]: string;
}

export const relocateUrl = (url: string) => {
  return window.location.href = url
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
      matchIndices.push(index.toString());
    }
  });

  for (let i = matchIndices.length - 1; i >= 0; i--) {
    arr1.splice(Number(matchIndices[i]), 1);
  }

  return arr1;
}

export const findWord = (str: string, src: string): boolean => {
  const regex = new RegExp(str, 'i');
  return regex.test(src);
}


export const checkLoginData = (): boolean => {
  const loginData = localStorage.getItem('loginData');

  if (loginData) {
    return true;
  } else {
    return false;
  }
}

export const clearLoginData = (): void => {
  localStorage.removeItem('loginData');
  relocateUrl('/')
}

export const checkTheme = (): void => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: "dark")').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

}