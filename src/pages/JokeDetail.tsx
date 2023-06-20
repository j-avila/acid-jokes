import { useState, ChangeEvent, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { handleJokes, useJokeDetail } from "../services"
import { IJoke, Itable } from "./types"
import FormSkeleton from "../components/FormSleketon"
import { useNotifications } from "../context/useNotifications"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFan,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"
import { baseUrl } from "../utils"

const JokeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateValue } = useNotifications()
  const morphedId = Number(id)
  const [formData, setFormData] = useState<Exclude<IJoke, "id">>({
    id: morphedId,
    title: "",
    body: "",
    author: "",
    createdat: "",
    views: 0,
  })
  const { data, isLoading } = useJokeDetail(morphedId)
  const { value } = useNotifications()
  const [isHover, setHover] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  interface Imutation extends Itable {
    id?: number
  }

  // handling the fetching events
  const mutation = useMutation({
    mutationFn: handleJokes,
    onSuccess: (data: Imutation) => {
      const success = {
        message: "Joke saved successfully 👻 !",
        type: "success",
        action: () => navigate(baseUrl),
        duration: 3000,
      }
      const deleted = {
        message: "Joke deleted 💩 !",
        action: () => navigate(baseUrl),
        duration: 3000,
      }

      updateValue(data.id ? success : deleted)
    },
    onError: () => {
      updateValue({
        message: "🤔 hmm... something worng happened, can try it again?",
        type: "error",
        action: (error: string) => console.log("☠️", error),
        duration: 5000,
      })
      setLoading(false)
    },
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    const method = id ? "patch" : "post"
    setLoading(true)
    mutation.mutate({ method, joke: formData, id })
  }

  const handleDelete = (): void => {
    setLoading(true)
    mutation.mutate({ method: "delete", joke: formData, id })
  }

  useEffect(() => {
    data && setFormData(data)
  }, [data])

  useEffect(() => {
    console.log("✏", formData)
  }, [formData])

  return (
    <div
      className={`rounded-lg shadow-md p-6 max-w-md mx-auto ${
        value.dark ? "dark:bg-font" : "bg-paper"
      }`}
    >
      {isLoading ? (
        <FormSkeleton rows={6} />
      ) : (
        <>
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
              value={formData?.title}
              onChange={handleChange}
              className="w-full px-4 py-2 text-font border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block mb-2 font-bold text-gray-700"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData?.author}
              onChange={handleChange}
              className="w-full px-4 py-2 text-font border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 font-bold text-gray-700"
            >
              Created At:
            </label>
            <input
              type="date"
              id="createdAt"
              name="createdAt"
              value={formData?.createdat}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-font border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 font-bold text-gray-700"
            >
              Views:
            </label>
            <input
              type="number"
              id="views"
              name="views"
              value={formData?.views}
              onChange={handleChange}
              className="w-full px-4 py-2 text-font border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block mb-2 font-bold text-gray-700"
            >
              Joke:
            </label>
            <textarea
              id="body"
              name="body"
              value={formData?.body}
              onChange={(e) => handleChange(e)}
              rows={10}
              className="w-full px-4 py-2 text-font border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </>
      )}
      <button
        type="button"
        disabled={loading}
        className={`w-full px-4 py-2 text-paper bg-indigo-500 rounded ${
          loading ? "bg-paper-half " : "bg-primary"
        } hover:bg-primary-half`}
        onMouseEnter={() => setHover("plane")}
        onMouseLeave={() => setHover("plane")}
        onClick={(e) => handleSubmit(e)}
      >
        {loading ? (
          <>
            <span>Wait a minute please</span>
            <FontAwesomeIcon className="pl-4" fontSize={20} icon={faFan} spin />
          </>
        ) : (
          <>
            <span>{id ? "Edit Joke" : "Create Joke"}</span>

            <FontAwesomeIcon
              fontSize={20}
              className="pl-4"
              icon={faPaperPlane}
              bounce={isHover === "plane"}
            />
          </>
        )}
      </button>
      {id && (
        <button
          type="button"
          disabled={loading}
          className={`w-full px-4 py-2 mt-6 text-paper rounded ${
            loading ? "bg-paper-half" : "bg-error"
          }`}
          onClick={() => handleDelete()}
          onMouseEnter={() => setHover("trash")}
          onMouseLeave={() => setHover("")}
        >
          {loading ? (
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
              <span>{id ? "Edit Joke" : "Create Joke"}</span>

              <FontAwesomeIcon
                fontSize={20}
                className="pl-4"
                icon={faTrashCan}
                bounce={isHover === "trash"}
              />
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default JokeDetail
