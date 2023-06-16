// libraries
import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "tailwindcss/tailwind.css"

// components
import HomePage from "./pages/HomePage"
import JokeDetail from "./pages/JokeDetail"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "detail", element: <JokeDetail /> },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
