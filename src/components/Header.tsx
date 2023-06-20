/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { baseUrl, findWord } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import ThemeToggle from "./ThemeToggle"
import { Link } from "react-router-dom"

type IAction = {
  [key: string]: {
    title: string
    styles: string
    route: string
  }
}

const ActionButton = (props: { action: string }): JSX.Element => {
  const { action } = props
  const actionVariants: IAction = {
    createJoke: {
      title: "New joke",
      styles:
        "px-4 py-2 block text-paper bg-indigo-500 flex items-center rounded bg-secondary  hover:bg-secondary-half",
      route: `${baseUrl}detail/`,
    },
    back: {
      title: "Go back",
      styles:
        "px-4 py-2 block text-paper bg-indigo-500 flex items-center rounded bg-secondary hover:bg-secondary-half",
      route: baseUrl,
    },
  }

  return (
    <>
      {Object.keys(actionVariants).includes(action) && (
        <Link
          to={actionVariants[action].route}
          className={actionVariants[action].styles}
        >
          <span className="m-auto text-paper">
            {actionVariants[action].title}
          </span>
        </Link>
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
        Acid <FontAwesomeIcon className="font-primary" icon={faCode} beatFade />
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
