/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { ReactComponent as Sky } from "../assets/sky.svg"
// @ts-ignore
import { ReactComponent as Light } from "../assets/light.svg"
// @ts-ignore
import { ReactComponent as Night } from "../assets/dark.svg"
import { useNotifications } from "../context/useNotifications"
import { useEffect } from "react"
import { checkTheme } from "../utils"

const ThemeToggle = () => {
  const { value, updateValue } = useNotifications()
  useEffect(() => {
    checkTheme()
  }, [value.dark])
  return (
    <div
      className="w-[100px] flex relative mx-6"
      onClick={() => updateValue({ ...value, dark: !value.dark })}
    >
      <div
        className={`w-[44px] h-[44px] rounded-full bg-paper dark:bg-font absolute top-[15%] ${
          value.dark ? "left-0" : "right-0"
        } z-10`}
      ></div>
      <Sky className="w-full" />
      <Light className="w-11 absolute top-[20%] left-0" />
      <Night className="w-11 absolute top-[20%] right-0" />
    </div>
  )
}

export default ThemeToggle
