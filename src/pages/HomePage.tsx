/* eslint-disable react-hooks/exhaustive-deps */
// libraries
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
// components
import Paginator from "../components/Paginator"
import Table from "../components/Table"
import { getJokes, handleJokes } from "../services"
import { Itable } from "./types"

function HomePage() {
  const [page, setPage] = useState({ current: 1, perpage: 5, total: 0 })
  const { data, isLoading, iserror } = useQuery<Itable>(["jokes"], getJokes)
  // const dataHandler = useMutation(handleJokes)

  useEffect(() => {
    data?.length > 0 && setPage({ ...page, total: data.length })
  }, [data])

  useEffect(() => {
    getJokes(page.current, page.current)
  }, [page])

  return (
    <>
      <h1 className="text-xl font-bold text-font text-center py-6">
        Acid {"</>"} jokes
      </h1>
      <main className="p-8">
        <Table
          data={data}
          tableKeys={["#", "title", "author", "createdat", "views"]}
        />
        <Paginator
          state={page}
          pageSize={page.perpage}
          totalCount={page.total}
          onPageChange={setPage}
        />
      </main>
    </>
  )
}

export default HomePage

// design references
// table: https://dribbble.com/shots/20995371-Customer-Table
// pallette & elements: https://www.pinterest.com/pin/345510602677766468/
