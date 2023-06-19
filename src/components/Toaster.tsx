/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useNotifications } from "../context/useNotifications"

const Toaster = () => {
  // dinamyc styles
  const defaultStyles = `flex items-center justify-between py-4 px-6 rounded-lg shadow-md min-w-[50%]`

  // states
  const [showToaster, setShowToaster] = useState(true)
  const [styles, setStyles] = useState(defaultStyles)
  const { value } = useNotifications()

  useEffect(() => {
    setShowToaster(true)
    setStyles(
      `${defaultStyles} ${
        value.type === "error"
          ? "bg-error text-background-half"
          : "bg-surface text-font"
      }`
    )
    const timer = setTimeout(() => {
      setShowToaster(false)
      if (value.action) {
        value.action()
      }
    }, value.duration)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return (
    <>
      {showToaster && (
        <div className="w-full fixed bottom-6 flex items-center justify-center z-50">
          <div className={styles}>
            <p className="flex-1 items-center text-center">{value.message}</p>
            <button className="ml-auto" onClick={() => setShowToaster(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Toaster
