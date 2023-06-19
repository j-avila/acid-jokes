import { useQuery } from "@tanstack/react-query";
import { IJoke, Itable } from "./pages/types"
import { lowercaseObjectKeys } from "./utils";

// types
export interface IPages {
  current: number | undefined
  perpage: number | undefined
  total?: number,
  id?: number | string
}

// fetching requests
export const url = ({ current, perpage, id }: Exclude<IPages, 'total'>) => {
  if (current && perpage) {
    return `https://retoolapi.dev/zu9TVE/jokes/?_page=${current || 1}&_limit=${perpage || 10}`

  }
  return `https://retoolapi.dev/zu9TVE/jokes/${id ? id : ''}`

}

export const getJokes = async ({ current, perpage }: Exclude<IPages, ["id", "total"]>): Promise<Itable> => {
  const response = await fetch(url({ current, perpage }))
  let data = await response.json()
  data = data.map((item: IJoke) => lowercaseObjectKeys(item))
  return data
}

export const getJoke = async (id: number): Promise<IJoke> => {
  const response = await fetch(url({ current: undefined, perpage: undefined, id }))
  let data = await response.json()
  data = lowercaseObjectKeys(data)
  return data
}

export const handleJokes = async (jokeData: { method: string, joke?: IJoke, id?: string }): Promise<IJoke[]> => {
  const params: IPages = { current: undefined, perpage: undefined, id: jokeData.id }
  const response = await fetch(url(params), {
    method: jokeData.method.toUpperCase(),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jokeData.joke)
  })
  const data = await response.json()
  return data
}


// query hooks
export const useJokes = (params: Exclude<IPages, 'total'>) => useQuery(['jokes'], () => getJokes(params))
export const useJokeDetail = (id: number) => useQuery(['jokeDetail'], () => getJoke(id))

