import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { handleJokes, useJokeDetail } from "../services"
import { IJoke } from "./types"
import FormSkeleton from "../components/FormSleketon"
import { useNotifications } from "../context/useNotifications"
import { relocateUrl } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFan, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const JokeDetail = () => {
  const { id } = useParams()
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

  // handling the fetching events
  const mutation = useMutation({
    mutationFn: handleJokes,
    onSuccess: (): void => {
      updateValue({
        message: "Joke saved successfully 👻!",
        type: "success",
        action: () => relocateUrl("/"),
        duration: 3000,
      })
    },
    onError: () =>
      updateValue({
        message: "🤔 hmm... something worng happened, can try it again?",
        type: "error",
        action: (error: string) => console.log("☠️", error),
        duration: 5000,
      }),
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    const method = id ? "patch" : "post"
    mutation.mutate({ method, joke: formData, id })
    // TODO manejar el success  o fail a terminar la reqest
  }

  useEffect(() => {
    data && setFormData(data)
  }, [data])

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
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
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            ></textarea>
          </div>
        </>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-4 py-2 text-background bg-indigo-500 rounded ${
          isLoading ? "bg-background-half " : "bg-primary"
        } hover:bg-primary-half`}
      >
        {isLoading ? (
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
            />
          </>
        )}
      </button>
    </form>
  )
}

export default JokeDetail
