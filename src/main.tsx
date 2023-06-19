// libraries
import React from "react"
import { checkLoginData } from "./utils"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// components
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import JokeDetail from "./pages/JokeDetail"
import Header from "./components/Header"
import Toaster from "./components/Toaster"
import NotificationsProvider from "./context/ContextWrapper"
// styles
import "tailwindcss/tailwind.css"
import Footer from "./components/Footer"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "detail/:id", element: <JokeDetail /> },
  { path: "detail/", element: <JokeDetail /> },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <NotificationsProvider>
        <>
          {checkLoginData() ? (
            <main className="p-2">
              <Header />
              <RouterProvider router={router} />
            </main>
          ) : (
            <Login />
          )}
        </>
        <Toaster />
      </NotificationsProvider>
      <Footer />
    </QueryClientProvider>
  </React.StrictMode>
)
