import { ChangeEvent, FormEvent, useState } from "react"
import {
  faEye,
  faEyeSlash,
  faFan,
  faKey,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// components
import Logo from "../components/Logo"
import { checkLoginData, relocateUrl } from "../utils"

interface IloginData {
  user: string | undefined
  password: string | undefined
}

const Login = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [loginData, setLoginData] = useState<IloginData>({
    user: undefined,
    password: undefined,
  })
  const [ishover, setHover] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    // Handle form submission logic here
    setLoading(true)
    localStorage.setItem("loginData", JSON.stringify(loginData))
    if (checkLoginData()) {
      setLoading(false)
      relocateUrl("/")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" login-form w-[45%] content-center">
        <Logo />
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 font-bold text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={loginData?.user}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 font-bold text-gray-700"
            >
              Title:
            </label>
            <span className="w-full block px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
              <input
                type={visible ? "text" : "password"}
                id="title"
                name="title"
                value={loginData?.password}
                onChange={handleChange}
                className="w-[95%]"
                required
              />
              <FontAwesomeIcon
                onClick={() => setVisible(!visible)}
                icon={visible ? faEye : faEyeSlash}
              />
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-background bg-indigo-500 rounded ${
              isLoading ? "bg-background-half " : "bg-primary"
            } hover:bg-primary-half`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {isLoading ? (
              <>
                <span>Wait a minute please</span>
                <FontAwesomeIcon
                  className="pl-4"
                  fontSize={20}
                  icon={faFan}
                  spin
                />
              </>
            ) : (
              <>
                <span>Login</span>

                <FontAwesomeIcon
                  fontSize={20}
                  className="pl-4"
                  icon={faKey}
                  shake={ishover}
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
