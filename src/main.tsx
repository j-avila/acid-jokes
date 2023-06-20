// libraries
import React, { useEffect } from "react"
import { baseUrl, checkLoginData, checkTheme } from "./utils"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// components
import Login from "./pages/Login"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import JokeDetail from "./pages/JokeDetail"
import Toaster from "./components/Toaster"
import Footer from "./components/Footer"
import NotificationsProvider from "./context/ContextWrapper"
import { useNotifications } from "./context/useNotifications"
// styles
import "./app.css"
import "tailwindcss/tailwind.css"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: baseUrl,
    element: (
      <>
        <Header />
        <HomePage /> <Footer />
      </>
    ),
  },
  {
    path: `${baseUrl}detail/`,
    element: (
      <>
        <Header />
        <JokeDetail />
        <Footer />
      </>
    ),
  },
  {
    path: `${baseUrl}detail/:id`,
    element: (
      <>
        <Header />
        <JokeDetail />
        <Footer />
      </>
    ),
  },
])

// eslint-disable-next-line react-refresh/only-export-components
const Wrapper = ({ children }) => {
  const { value } = useNotifications()

  useEffect(() => {
    localStorage.theme = value.dark ? "dark" : "light"
  }, [value.dark])

  useEffect(() => {
    checkTheme()
  })

  return (
    <div className={`app ${value.dark ? "dark" : ""} h-screen`}>{children}</div>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <Wrapper>
          <ReactQueryDevtools />
          {checkLoginData() ? (
            <main>
              <RouterProvider router={router} />
            </main>
          ) : (
            <Login />
          )}
          <Toaster />
        </Wrapper>
      </NotificationsProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
