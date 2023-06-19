import { useContext } from "react"
import { Notifications, NotificationsProps } from "./ContextWrapper"

export const useNotifications = (): NotificationsProps => {
  const context = useContext(Notifications)
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    )
  }
  return context
}
