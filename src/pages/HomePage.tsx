/* eslint-disable react-hooks/exhaustive-deps */
// libraries
import React, { useEffect, useState } from "react"
// components
import Paginator from "../components/Paginator"
import Table from "../components/Table"
import { IPages, useJokes } from "../services"

const HomePage = () => {
  const [pages, setPage] = useState<IPages>({
    current: 1,
    perpage: 10,
    total: 0,
  })
  const { data, refetch, isLoading } = useJokes(pages)

  useEffect(() => {
    refetch(pages)
  }, [pages])

  useEffect(() => {
    data && setPage({ ...pages, total: data.length })
  }, [data])

  return (
    <>
      <div className="p-8">
        <Table
          data={data}
          isLoading={isLoading}
          tableKeys={{
            heads: ["#", "title", "author", "createdat", "views"],
            hiddenValues: ["id"],
          }}
        />
        <Paginator
          state={pages}
          pageSize={pages.perpage}
          totalCount={pages.total}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}

export default HomePage

// design references
// table: https://dribbble.com/shots/20995371-Customer-Table
// pallette & elements: https://www.pinterest.com/pin/345510602677766468/
