import { useEffect, useState } from "react"
import { createNumberArray } from "../utils"

export const FormSkeleton = ({
  rows = 4,
  cols = 5,
}: {
  rows?: number
  cols?: number
}) => {
  const [fields, setfields] = useState<number[]>()
  const [colsNumber, setColsNumber] = useState("grid grid-cols-5 gap-4")

  useEffect(() => {
    const newRows: number[] = createNumberArray(1, rows)
    setfields(newRows)
    setColsNumber(`grid grid-cols-${cols} gap-4`)
  }, [rows, cols])

  return (
    <>
      {fields?.map((row: number) => (
        <div
          key={row}
          className="mb-4 px-3 py-4 text-sm text-center md:text-left truncate"
        >
          <div className="h-4 bg-background rounded col-span-1"> </div>
        </div>
      ))}
    </>
  )
}

export default FormSkeleton
