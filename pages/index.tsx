import Timer from "@/components/timer"
import TaskList from "@/components/tasklist"

interface Users {
  id: number
  username : string
  password : string
}

export default function index() {

  return (
    <div>
      <p>ING WEB PROYECT</p>
      <Timer/>
      <TaskList/>
    </div>
  )
}
