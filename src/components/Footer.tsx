import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { checkLoginData, clearLoginData } from "../utils"

const Footer = () => {
  const [isHover, setHover] = useState(false)
  return (
    <footer className="text-center text-background-half p-6">
      {checkLoginData() && (
        <button
          className="mb-6 hover:text-font"
          onClick={() => clearLoginData()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Sign out <FontAwesomeIcon icon={faDoorOpen} shake={isHover} />
        </button>
      )}
      <p className="hover:text-font underline">
        <a href="https://joseavila.dev">made with ☕️ by jose avila</a>
      </p>
    </footer>
  )
}

export default Footer
