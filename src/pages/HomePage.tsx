
function HomePage() {

  return (
    <>
      <h1 className="text-xl font-bold text-font text-center p-12">Acid {"</>"} jokes</h1>
      <main>
        <div className="grid p-6 max-w-sm mx-auto bg-background rounded-xl shadow-lg items-center space-x-8">
          <div className="row flex flex-row border-b border-gray-300 p-10">
            <div className="header text-gray-500 font-semibold bg-gray-100">
              First Name
            </div>
            <div className="header text-gray-500 font-semibold bg-gray-100">
              Last Name
            </div>
            <div className="header text-gray-500 font-semibold bg-gray-100">
              Age
            </div>
          </div>
          <div className="row flex flex-row p-10">
            <div className="cell text-gray-900">John</div>
            <div className="cell text-gray-900">Doe</div>
            <div className="cell text-gray-900">25</div>
          </div>
          <div className="row flex flex-row p-10">
            <div className="cell text-gray-900">Jane</div>
            <div className="cell text-gray-900">Smith</div>
            <div className="cell text-gray-900">30</div>
          </div>
          <div className="row flex flex-row p-10">
            <div className="cell text-gray-900">Peter</div>
            <div className="cell text-gray-900">Jones</div>
            <div className="cell text-gray-900">35</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
