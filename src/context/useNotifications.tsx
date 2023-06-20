import { useContext } from "react"
import { Notifications } from "./ContextWrapper"

export const useNotifications = () => {
  const context = useContext(Notifications)
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    )
  }
  return context
}
