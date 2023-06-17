import { useQuery } from "@tanstack/react-query";
import { IJoke, Itable } from "./pages/types"
import { lowercaseObjectKeys } from "./utils";

// types
export interface IPages {
  current: number
  perpage: number
  total: number
}

interface IfetchParams { page?: number, limit?: number, id?: string }

// fetching requests
export const url = ({ page, limit, id }: IfetchParams) => {
  if (page && limit) {
    return `https://retoolapi.dev/zu9TVE/jokes/?_page=${page || 1}&_limit=${limit || 10}`

  }
  return `https://retoolapi.dev/zu9TVE/jokes/${id ? id : ''}`

}

export const getJokes = async ({ current, perpage }: Exclude<IPages, 'total'>): Promise<Itable> => {
  const response = await fetch(url({ page: current, limit: perpage }))
  let data = await response.json()
  data = data.map((item: IJoke) => lowercaseObjectKeys(item))
  return data
}

export const handleJokes = async (method: string, joke?: IJoke, id?: string): Promise<IJoke[]> => {
  const params = { undefined, undefined, id }
  const response = await fetch(url(params), {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    body: joke ? JSON.stringify(joke) : undefined
  })
  const data = await response.json()
  return data
}


// query hooks
export const useJokes = (params: Exclude<IPages, 'total'>) => useQuery(['jokes'], () => getJokes(params))

