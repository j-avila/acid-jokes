import { useState } from "react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

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
  const [currentPage, setCurrentPage] = useState(1)

  const pageCount = Math.ceil(totalCount / pageSize)

  const handlePageChange = (key: string, value: number) => {
    if (key === "current") {
      setCurrentPage(value)
    }
    const updatedState = { ...state, [key]: value }
    onPageChange(updatedState)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <li
          key={i}
          className="flex items-center px-4 py-2 mx-1 my-1 rounded-md bg-gray-200 hover:bg-gray-600 cursor-pointer"
        >
          <button
            onClick={() => handlePageChange("current", i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        </li>
      )
    }

    return pageNumbers
  }

  return (
    <nav className="paginator flex items-center justify-center max-w-xl mt-8 m-auto">
      <ArrowBackIosIcon />
      <ul className="flex w-auto rounded-md bg-white justify-center">
        {renderPageNumbers()}
      </ul>
      <ArrowForwardIosIcon />
      <div className="w-auto ml-4">
        <label>Items per page</label>
        <select
          name="perpage"
          id="perpage"
          className="ml-4"
          onChange={(e) => handlePageChange("perpage", Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>
    </nav>
  )
}

export default Pagination
