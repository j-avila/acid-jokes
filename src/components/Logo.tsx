import { faCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { relocateUrl } from "../utils"

const Logo = () => {
  return (
    <h1
      className="text-xl font-bold text-font text-center py-2 block"
      onClick={() => relocateUrl("/")}
    >
      Acid
      <FontAwesomeIcon className="text-primary mx-2" icon={faCode} beatFade />
      jokes
    </h1>
  )
}
export default Logo
