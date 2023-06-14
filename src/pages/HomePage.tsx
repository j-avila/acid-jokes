import Table from "../components/Table"

function HomePage() {
  const fakeData = [
    {
      id: 19,
      Title: "Mountaineering",
      Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Author: "crubery6s@simplemachines.org",
      Views: 98,
      CreatedAt: 1670164409747,
    },
    {
      id: 20,
      Title: "triste",
      Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Author: "once@chupaloentonce.org",
      Views: 98,
      CreatedAt: 1670164409756456,
    },
  ]

  return (
    <>
      <h1 className="text-xl font-bold text-font text-center py-6">
        Acid {"</>"} jokes
      </h1>
      <main className="p-8">
        <Table data={fakeData} />
        {/* TODO: create paginator */}
      </main>
    </>
  )
}

export default HomePage
