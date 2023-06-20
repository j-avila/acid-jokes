/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

type Ipagination = {
  current: number
  perpage: number
  total: number
}

interface IPaginator {
  state: Ipagination
  pageSize: number
  totalCount: number
  onPageChange: (page: Ipagination) => void
}

const Pagination = ({
  state,
  pageSize,
  totalCount,
  onPageChange,
}: IPaginator) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handlePageChange = (key: string, value: number) => {
    if (key === "current") {
      setCurrentPage(value)
    }
    const updatedState = { ...state, [key]: value }
    onPageChange(updatedState)
  }

  return (
    <nav className="paginator flex items-center justify-center max-w-xl mt-8 m-auto">
      {currentPage === 1 ||
        (currentPage > 0 && (
          <FontAwesomeIcon
            className="pr-6 text-primary"
            icon={faChevronLeft}
            fontSize={20}
            onClick={() => handlePageChange("current", currentPage - 1)}
          />
        ))}
      <div className="w-auto ml-4">
        <label>Items per page</label>
        <select
          name="perpage"
          id="perpage"
          className="bg-[transparent] ml-4"
          onChange={(e) => handlePageChange("perpage", Number(e.target.value))}
        >
          <option value="5" selected={pageSize === 5}>
            5
          </option>
          <option value="10" selected={pageSize === 10}>
            10
          </option>
        </select>
      </div>
      {totalCount > 0 && (
        <FontAwesomeIcon
          className="pl-6 text-primary"
          icon={faChevronRight}
          fontSize={20}
          onClick={() => handlePageChange("current", currentPage + 1)}
        />
      )}
    </nav>
  )
}

export default Pagination
