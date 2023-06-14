// types
type IJoke = {
  id: number
  Title: string
  Body: string
  Author: string
  Views: number
  CreatedAt: number
}
type Itable = Array<IJoke>

const TdItems = (props: { cell: IJoke }) => {
  const { cell } = props
  const keys = Object.keys(cell)

  return (
    <>
      {keys.length > 0 ? (
        keys.map((key) => (
          <div className="td px-3 py-4 text-sm text-center md:text-left truncate">
            {cell[key as string]}
          </div>
        ))
      ) : (
        <p>not data</p>
      )}
    </>
  )
}

// component
const Table = (props: { data: Itable }) => {
  const { data } = props

  return (
    <div className="w-full px-4 pb-12 pt-2 bg-background-half shadow-md rounded-lg overflow-hidden">
      <div className="tableHeads grid grid-cols-1 gap-0 md:grid-cols-6">
        {data ? (
          Object.keys(data[0]).map((head) => (
            <div className="tableDivision p-3 text-xs font-medium text-gray-500 text-center md:text-left">
              {head}
            </div>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </div>
      <span className="w-full h-px my-4 block bg-font"></span>
      {data ? (
        data.map((cell) => (
          <div className="tableRows my-1 bg-background grid grid-cols-1 gap-0 md:grid-cols-6 rounded-lg">
            <TdItems key={cell.id} cell={cell} />
          </div>
        ))
      ) : (
        <h1>No data</h1>
      )}
    </div>
  )
}

export default Table
