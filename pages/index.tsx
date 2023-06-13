import Timer from "@/components/timer";
import TaskList from "@/components/tasklist";
import { useEffect, useState } from "react";
import { dividerClasses } from "@mui/material";

export default function index() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsersData() {
      const urlEndPoint = `http://localhost:3000/api/users`;
      const response = await fetch(urlEndPoint);
      const res = await response.json();
      console.log(res);
      setUsers(res.results);
    }
    getUsersData();
  }, []);

  return (
    <div>
      <p>ING WEB PROYECT</p>
      <Timer />
      <TaskList />
    </div>
  );
}
