import { useEffect } from "react"
import { useParams } from "react-router-dom"

const JokeDetail = () => {
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
  }, [])
  return <div>{`JokeDetail ${id}`}</div>
}

export default JokeDetail
