/* eslint-disable react-hooks/exhaustive-deps */
// libraries
import { useEffect, useState } from "react"
import { MyObject, compareArrays, orderObject } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
// components
import TableLoader from "./TableLoader"
// types
import { IJoke, Itable } from "../pages/types"

// rows
const TdItems = (props: {
  cell: IJoke
  index: number
  key: string | number
  hidden: string[]
}) => {
  const { cell, index, hidden } = props
  const keys = Object.keys(cell)
  const keysFiltered = compareArrays(Object.keys(cell), hidden)
  keys.unshift(index.toString())
  keysFiltered.unshift(index.toString())

  const handleViewsStyles = (key: string, views: number): string => {
    let color = "text-font"
    let styles = `shadow td px-3 py-4 text-sm ${color} md:text-left truncate`

    if (key === "views") {
      const viewsCount = Number(views)
      if (viewsCount <= 25) {
        styles =
          "shadow td px-3 py-4 text-sm bg-tomato text-background md:text-left font-bold rounded-r truncate"
      } else if (viewsCount > 25 && viewsCount <= 50) {
        styles =
          "shadow td px-3 py-4 text-sm bg-orange text-background md:text-left font-bold rounded-r truncate"
      } else if (viewsCount > 60 && viewsCount <= 75) {
        styles =
          "shadow td px-3 py-4 text-sm bg-yellow text-font md:text-left font-bold rounded-r truncate"
      } else if (viewsCount > 75) {
        styles =
          "shadow td px-3 py-4 text-sm bg-green  text-background md:text-left font-bold rounded-r truncate"
      }
    }
    return styles
  }

  return (
    <>
      {keysFiltered.length > 0 ? (
        keysFiltered.map((key) => (
          <>
            {key === "title" ? (
              <a
                className="hover:underline"
                href={`/detail/${cell.id}`}
                key={`cell-${key}`}
              >
                <div className={handleViewsStyles(key, cell[key])}>
                  {cell[key] ||
                    (cell[key] === " " && "no data") ||
                    index ||
                    "No Aviable"}
                </div>
              </a>
            ) : (
              <div className={handleViewsStyles(key, cell[key])}>
                {cell[key] ||
                  (cell[key] === " " && "no data") ||
                  index ||
                  "No Aviable"}
              </div>
            )}
          </>
        ))
      ) : (
        <p className="text-center">not data</p>
      )}
    </>
  )
}

// component
const Table = (props: {
  data?: Itable
  tableKeys: { heads: string[]; hiddenValues: string[] }
  isLoading: boolean
}) => {
  const { data, tableKeys, isLoading } = props
  const [cells, setCells] = useState<IJoke[]>()
  const [colsHead, setColsHead] = useState<string>(
    "tableHeads grid grid-cols-1 gap-0 md:grid-cols-5"
  )
  const [colsBody, setColsBody] = useState<string>("")
  // parsing the cells
  const tableCells = (
    cellData: IJoke[],
    cellKeys: string[],
    hidden: string[]
  ) => {
    const getCells = (cell: IJoke, accept: string[], hiddenVals: string[]) => {
      const allValues = hiddenVals ? [...accept, ...hiddenVals] : accept
      const result: object = {}

      for (const key in cell) {
        if (allValues.includes(key as string)) {
          result[key] = cell[key]
        }
      }

      return result
    }

    const result: Partial<IJoke[]> = cellData.map((cell) =>
      getCells(cell, cellKeys, hidden)
    )

    setCells(result)
  }

  useEffect(() => {
    if (data && tableKeys.heads.length > 0) {
      const formattedData: MyObject[] = data.map((item) => {
        const allKeys = [...tableKeys.heads, ...tableKeys.hiddenValues]
        return orderObject(item, allKeys)
      })
      // setting up  the grid dynamically
      setColsHead(
        `tableHeads grid grid-cols-1 gap-0 md:grid-cols-${tableKeys.heads.length}`
      )
      setColsBody(
        `tableRows my-1 bg-background grid grid-cols-1 gap-0 md:grid-cols-${tableKeys.heads.length} rounded-lg`
      )

      tableCells(formattedData, tableKeys.heads, tableKeys.hiddenValues)
    }
  }, [data])

  return (
    <div className="w-full px-4 pb-12 pt-2 bg-background-half shadow-md rounded-lg overflow-hidden">
      <div className={colsHead}>
        {tableKeys.heads ? (
          tableKeys.heads.map((head) => (
            <div
              key={`key-${head}`}
              className="tableDivision p-3 text-xs font-medium text-gray-500 text-center md:text-left"
            >
              {head === "createdat" ? "crated date" : head}
            </div>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </div>
      <span className="w-full h-px my-4 block bg-font"></span>
      {isLoading ? (
        <>
          <TableLoader />
        </>
      ) : cells?.length > 0 ? (
        <>
          {cells ? (
            cells.map((cell, index) => (
              <div key={cell.id} className={colsBody}>
                <TdItems
                  key={cell.id}
                  index={index}
                  cell={cell}
                  hidden={tableKeys.hiddenValues}
                />
              </div>
            ))
          ) : (
            <h1>No data</h1>
          )}
        </>
      ) : (
        <div className="flex-col text-center my-10 bg-background p-8 rounded">
          <FontAwesomeIcon icon={faCoffee} fontSize={100} className="pb-8" />
          <h1 className="text-lg">You've reached the end of the jokes</h1>
        </div>
      )}
    </div>
  )
}

export default Table
