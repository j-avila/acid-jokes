/* eslint-disable react-hooks/exhaustive-deps */
// libraries
import { useEffect, useState } from "react"
import { baseUrl, compareArrays, orderObject } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
// components
import TableLoader from "./TableSkeleton"
// types
import { IJoke, Itable } from "../pages/types"
import { useNotifications } from "../context/useNotifications"
import { Link } from "react-router-dom"
import ErrorMug from "./Error"

// rows
const TdItems = (props: {
  cell: IJoke
  index: number
  key: string | number
  hidden: string[]
  [key: string]: unknown
}) => {
  const { cell, index, hidden } = props
  const keys = Object.keys(cell)
  const keysFiltered = compareArrays(Object.keys(cell), hidden)
  keys.unshift(index.toString())
  keysFiltered.unshift(index.toString())

  const handleViewsStyles = (key: string, views: number): string => {
    let styles = `shadow td px-3 py-4 text-sm text-left truncate`

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
    } else if (key === "#") {
      styles = "shadow td px-3 py-4 text-sm md:text-left truncate rounded-l"
    }
    return styles
  }

  return (
    <>
      {keysFiltered.length > 0 ? (
        keysFiltered.map((key: string) => (
          <>
            {key === "title" || key == "#" ? (
              <Link
                className="hover:underline"
                to={`${baseUrl}detail/${cell.id}`}
                key={`cell-${key}`}
              >
                <div
                  className={handleViewsStyles(
                    key as string,
                    cell[key as string]
                  )}
                >
                  {cell[key as string] ||
                    (cell[key as string] === " " && "no data") ||
                    index ||
                    "No Aviable"}
                </div>
              </Link>
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
  [key: string]: unknown
}) => {
  const { data, tableKeys, isLoading } = props
  const [cells, setCells] = useState([])
  const { value } = useNotifications()
  const [colsHead, setColsHead] = useState(
    "tableHeads grid grid-cols-1 gap-0 md:grid-cols-5"
  )
  const [colsBody, setColsBody] = useState("")
  // parsing the cells
  const tableCells = (cellData, cellKeys, hidden) => {
    const getCells = (cell, accept, hiddenVals): unknown => {
      const allValues = hiddenVals ? [...accept, ...hiddenVals] : accept
      const result: object = {}

      for (const key in cell) {
        if (allValues.includes(key as string)) {
          result[key] = cell[key]
        }
      }

      return result
    }

    const result = cellData.map((cell) => getCells(cell, cellKeys, hidden))

    setCells(result)
  }

  useEffect(() => {
    if (data && tableKeys.heads.length > 0) {
      const formattedData = data.map((item) => {
        const allKeys = [...tableKeys.heads, ...tableKeys.hiddenValues]
        return orderObject(item, allKeys)
      })
      // setting up  the grid dynamically
      setColsHead(
        `tableHeads grid grid-cols-1 gap-0 md:grid-cols-${tableKeys.heads.length}`
      )
      setColsBody(
        `tableRows my-1 bg-paper bg-opacity-5 grid grid-cols-1 gap-0 md:grid-cols-${tableKeys.heads.length} rounded-lg`
      )

      tableCells(formattedData as any, tableKeys.heads, tableKeys.hiddenValues)
    }
  }, [data])

  return (
    <div
      className={`w-full px-4 pb-12 pt-2 shadow-md rounded-lg overflow-hidden ${
        value.dark ? "dark:bg-font" : "bg-paper"
      }`}
    >
      <div className={colsHead}>
        {tableKeys.heads ? (
          tableKeys.heads.map((head) => (
            <div
              key={`key-${head}`}
              className="tableDivision p-3 text-xs font-medium text-center md:text-left"
            >
              {head === "createdat" ? "crated date" : head}
            </div>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </div>
      <span
        className={`w-full h-px my-4 block ${
          value.dark ? "dark:bg-paper" : "bg-font"
        }`}
      ></span>
      {isLoading ? (
        <>
          <TableLoader />
        </>
      ) : cells && cells.length > 0 ? (
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
        <ErrorMug dark={value.dark} />
      )}
    </div>
  )
}

export default Table
