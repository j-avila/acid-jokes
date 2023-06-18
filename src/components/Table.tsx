/* eslint-disable react-hooks/exhaustive-deps */
// libraries
import { useEffect, useState } from "react"
import { MyObject, compareArrays, orderObject } from "../utils"
import { IJoke, Itable } from "../pages/types"
// components
import TableLoader from "./TableLoader"
import CampaignIcon from "@mui/icons-material/Campaign"

// rows
const TdItems = (props: {
  cell: IJoke
  index: number
  key: number
  hidden: string[]
}) => {
  const { cell, index, hidden } = props
  const keys = Object.keys(cell)
  const keysFiltered = compareArrays(Object.keys(cell), hidden)
  keys.unshift(index.toString())
  keysFiltered.unshift(index.toString())

  return (
    <>
      {keysFiltered.length > 0 ? (
        keysFiltered.map((key) => (
          <div
            key={`cell-${key}`}
            className="shadow td px-3 py-4 text-sm text-center md:text-left truncate"
          >
            <a href={`/detail/${cell.id}`}>
              {cell[key as string] || index || "No Aviable"}
            </a>
          </div>
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
    // TODO filtrar aqui los hidden para que no
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
        `tableRows my-1 bg-background grid grid-cols-1 gap-0 md:md:grid-cols-${tableKeys.heads.length} rounded-lg`
      )

      console.log(formattedData) // TODO hasta aqui ok el hidden value de id

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
              // TODO Filtrar aqui para evitar rendirzar los hidden como id
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
          <CampaignIcon sx={{ fontSize: 100 }} />
          <h1>You've reached the end of the jokes</h1>
        </div>
      )}
    </div>
  )
}

export default Table
