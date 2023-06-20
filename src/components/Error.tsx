import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ErrorMug = ({ dark }) => {
  return (
    <div
      className={`flex-col text-center my-10 p-8 rounded ${
        dark ? "dark:bg-font-half" : "bg-paper-half"
      }`}
    >
      <FontAwesomeIcon icon={faCoffee} fontSize={100} className="pb-8" />
      <h1 className="text-lg ">You've reached the end of the jokes</h1>
    </div>
  )
}

export default ErrorMug
