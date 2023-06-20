/* eslint-disable react-hooks/exhaustive-deps */
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

  useEffect(() => {
    const newRows: number[] = createNumberArray(1, rows)
    setfields(newRows)
  }, [rows, cols])

  return (
    <>
      {fields?.map((row: number) => (
        <div
          key={row}
          className="mb-4 px-3 py-4 text-sm text-center md:text-left truncate"
        >
          <div className="h-4 bg-paper dark:bg-font-half rounded col-span-1">
            {" "}
          </div>
        </div>
      ))}
    </>
  )
}

export default FormSkeleton
