import Timer from "@/components/timer"
import TaskList from "@/components/tasklist"
import { useEffect, useState } from "react"

interface Users {
  id: number
  username : string
  password : string
}

export default function index() {
  
  const [users, setUsers] = useState<Users[]>([])
  useEffect( () => {
    async function getUsersData() {
      const urlEndPoint = `http://localhost:3000/api/users`
      const response = await fetch(urlEndPoint)
      const res = await response.json()
      console.log(res)
      setUsers(res.users)
    }
    getUsersData()
  }, [])

  return (
    <div>
      <p>ING WEB PROYECT</p>
      {
        users.map(({id, username, password}:Users, index:number) => {
          return (
            <div key={index}>
              <h2>{id}, {username}, {password}</h2> {/* test para ver si funciona la db*/} 
            </div>
            )
        })
      }
      <Timer/>
      <TaskList/>
    </div>
  )
}
