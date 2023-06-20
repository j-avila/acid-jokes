import { createContext, useState } from "react"
type IValueObj = {
  message: string
  type: string
  duration: number
  action: () => void
  dark?: boolean
  id?: unknown
}

export interface INotificationsProps {
  value: IValueObj
  updateValue: (newValue) => void
}

export const Notifications = createContext<INotificationsProps | undefined>(
  undefined
)

const NotificationsProvider = ({ children }) => {
  const [value, setValue] = useState({
    message: undefined,
    type: "alert",
    duration: undefined,
    dark: false,
    action: undefined,
  })

  const updateValue = (newValue) => {
    setValue(newValue)
  }

  return (
    <Notifications.Provider value={{ value, updateValue }}>
      {children}
    </Notifications.Provider>
  )
}

export default NotificationsProvider
