import { IJoke } from "./pages/types";

interface MyObject {
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
