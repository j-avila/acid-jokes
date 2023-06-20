import { useEffect, useState } from "react"
import { createNumberArray } from "../utils"

export const TableSkeleton = ({
  rows = 4,
  cols = 5,
}: {
  rows?: number
  cols?: number
}) => {
  const [rowsNumber, setRowsNumber] = useState<number[]>()
  const [colsNumber, setColsNumber] = useState("grid grid-cols-5 gap-4")

  useEffect(() => {
    const newRows: number[] = createNumberArray(1, 5)
    setRowsNumber(newRows)
    setColsNumber(`grid grid-cols-${cols} gap-4`)
  }, [rows, cols])

  return (
    <>
      {rowsNumber?.map((row: number) => (
        <div
          key={row}
          className="shadow rounded-md td px-3 py-4 text-sm text-center md:text-left truncate"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className={colsNumber}>
                  <div className="h-4 bg-paper dark:bg-font-half rounded col-span-1"></div>
                  <div className="h-4 bg-paper dark:bg-font-half rounded col-span-1"></div>
                  <div className="h-4 bg-paper dark:bg-font-half rounded col-span-1"></div>
                  <div className="h-4 bg-paper dark:bg-font-half rounded col-span-1"></div>
                  <div className="h-4 bg-paper dark:bg-font-half rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default TableSkeleton
