/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { findWord, relocateUrl } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import ThemeToggle from "./ThemeToggle"

type IAction = {
  [key: string]: {
    title: string
    styles: string
    action: () => void
  }
}

const ActionButton = (props: { action: string }): JSX.Element => {
  const { action } = props
  const actionVariants: IAction = {
    createJoke: {
      title: "New joke",
      styles:
        "px-4 py-2 block text-background bg-indigo-500 rounded bg-secondary hover:bg-secondary-half",
      action: () => relocateUrl("/detail/"),
    },
    back: {
      title: "Go back",
      styles:
        "px-4 py-2 block text-background bg-indigo-500 rounded bg-secondary hover:bg-secondary-half",
      action: () => relocateUrl("/"),
    },
  }

  return (
    <>
      {Object.keys(actionVariants).includes(action) && (
        <button
          type="button"
          onClick={actionVariants[action].action}
          className={actionVariants[action].styles}
        >
          <span>{actionVariants[action].title}</span>
        </button>
      )}
    </>
  )
}

const Header = () => {
  const [state, setState] = useState<string>("")

  const handleActions = (word: string, url: string): void => {
    const wordAction = findWord(word, url)
    if (word === "detail" && wordAction) {
      setState("back")
    } else {
      setState("createJoke")
    }
  }

  useEffect(() => {
    handleActions("detail", window.location.href.toString())
  }, [window.location.href])

  return (
    <header className="flex justify-between align-middle w-full py-8 px-12 ">
      <h1 className="text-xl font-bold text-center py-2">
        Acid <FontAwesomeIcon className="font-primary" icon={faCode} beatFade />{" "}
        jokes
      </h1>
      <div className="flex">
        <ThemeToggle />
        <ActionButton action={state} />
      </div>
    </header>
  )
}

export default Header
