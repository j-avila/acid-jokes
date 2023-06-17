/* eslint-disable react-hooks/exhaustive-deps */
// libraries
import { useEffect, useState } from "react"
import { MyObject, orderObject } from "../utils"
import { IJoke, Itable } from "../pages/types"
// components
import TableLoader from "./TableLoader"
import CampaignIcon from "@mui/icons-material/Campaign"

// rows
const TdItems = (props: { cell: IJoke; index: number; key: number }) => {
  const { cell, index } = props
  const keys = Object.keys(cell)
  keys.unshift(index.toString())

  return (
    <>
      {keys.length > 0 ? (
        keys.map((key) => (
          <div
            key={`cell-${key}`}
            className="shadow td px-3 py-4 text-sm text-center md:text-left truncate"
          >
            {cell[key as string] || index || "No Aviable"}
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
  tableKeys: string[]
  isLoading: boolean
}) => {
  const { data, tableKeys, isLoading } = props
  const [cells, setCells] = useState<IJoke[]>()
  const [colsHead, setColsHead] = useState<string>(
    "tableHeads grid grid-cols-1 gap-0 md:grid-cols-5"
  )
  const [colsBody, setColsBody] = useState<string>("")
  const tableCells = (cellData: IJoke[], cellKeys: string[]) => {
    const getCells = (cell: IJoke, accept: string[]) => {
      const result: object = {}

      for (const key in cell) {
        if (accept.includes(key as string)) {
          result[key as string] = cell[key as string]
        }
      }

      return result
    }

    const result: Partial<IJoke[]> = cellData.map((cell) =>
      getCells(cell, cellKeys)
    )

    setCells(result)
  }

  useEffect(() => {
    if (data && tableKeys.length > 0) {
      const fromattedData: MyObject[] = data.map((item) =>
        orderObject(item, tableKeys)
      )
      // setting up  the grid dynamically
      setColsHead(
        `tableHeads grid grid-cols-1 gap-0 md:grid-cols-${tableKeys.length}`
      )
      setColsBody(
        `tableRows my-1 bg-background grid grid-cols-1 gap-0 md:md:grid-cols-${tableKeys.length} rounded-lg`
      )
      tableCells(fromattedData, tableKeys)
    }
  }, [data])

  return (
    <div className="w-full px-4 pb-12 pt-2 bg-background-half shadow-md rounded-lg overflow-hidden">
      <div className={colsHead}>
        {tableKeys ? (
          tableKeys.map((head) => (
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
                <TdItems key={cell.id} index={index} cell={cell} />
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
