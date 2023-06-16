import { IJoke, Itable } from "./pages/types"

const lowercaseObjectKeys = (obj) => {
  const keys = Object.keys(obj);
  const lowercasedObj = {};

  for (let i = 0; i < keys.length; i++) {
    lowercasedObj[keys[i].toLowerCase()] = obj[keys[i]];
  }

  return lowercasedObj;
}

export const url = (page?: number, limit?: number, id?: string) => {
  if (page && limit) {
    return `https://retoolapi.dev/zu9TVE/jokes/?_page=${page || 1}&_limit=${limit || 5}`

  }
  return `https://retoolapi.dev/zu9TVE/jokes/${id ? id : ''}`

}

export const getJokes = async (page: number, limit: number): Promise<IJoke[]> => {
  const response = await fetch(url(page, limit))
  let data = await response.json()
  data = data.map((item: Itable) => lowercaseObjectKeys(item))
  return data
}

export const handleJokes = async (method: string, joke?: IJoke, id?: string): Promise<IJoke[]> => {
  const response = await fetch(url(undefined, undefined, id), {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    body: joke ? JSON.stringify(joke) : undefined
  })
  const data = await response.json()
  return data
}


