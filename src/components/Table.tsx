/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IJoke, Itable } from "../pages/types"
import { orderBySpecificOrder, orderObject } from "../utils"

const TdItems = (props: { cell: IJoke; index: number }) => {
  const { cell, index } = props
  const keys = Object.keys(cell)
  keys.unshift(index.toString())

  return (
    <>
      {keys.length > 0 ? (
        keys.map((key) => (
          <div
            key={cell.id}
            className="td px-3 py-4 text-sm text-center md:text-left truncate"
          >
            {cell[key as string] || index || "No Aviable"}
          </div>
        ))
      ) : (
        <p>not data</p>
      )}
    </>
  )
}

// component
const Table = (props: { data: Itable; tableKeys: string[] }) => {
  const { data, tableKeys } = props
  const [heads, setHeads] = useState<string[]>([])
  const [cells, setCells] = useState<IJoke[]>()
  const [colsHead, setColsHead] = useState<string>("")
  const [colsBody, setColsBody] = useState<string>("")
  const Tkeys: string[] = tableKeys

  // handle dinamic table heads & cells
  const tableHeads = (arr: string[], accept: string[]): void => {
    const heads: string[] = arr.filter((head) => {
      let result
      if (accept.includes(head)) {
        result = head
      }

      return result
    })

    setHeads(heads)
  }

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
      const fromattedData = data.map((item) => orderObject(item, tableKeys))

      setColsHead(`tableHeads grid grid-cols-1 gap-0 md:grid-cols-5`)
      setColsBody(
        `tableRows my-1 bg-background grid grid-cols-1 gap-0 md:md:grid-cols-5 rounded-lg`
      )
      tableHeads(Tkeys, tableKeys)
      tableCells(fromattedData, tableKeys)
    }
  }, [data])

  return (
    <div className="w-full px-4 pb-12 pt-2 bg-background-half shadow-md rounded-lg overflow-hidden">
      <div className={colsHead}>
        {heads ? (
          heads.map((head) => (
            <div
              key={`key-${head}`}
              className="tableDivision p-3 text-xs font-medium text-gray-500 text-center md:text-left"
            >
              {head}
            </div>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </div>
      <span className="w-full h-px my-4 block bg-font"></span>
      {cells ? (
        cells.map((cell, index) => (
          <div key={cell.id} className={colsBody}>
            <TdItems key={cell.id} cell={cell} index={index} />
          </div>
        ))
      ) : (
        <h1>No data</h1>
      )}
    </div>
  )
}

export default Table
