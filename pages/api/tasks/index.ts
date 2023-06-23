import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const dbconnection = await connect();

  switch (method) {
    case "POST":
      try {
        const { nameTarea, estado, descripcion, idUser } = body;
        const query =
          "INSERT INTO tarea(nameTarea, estado, descripcion, idUser, deleted) VALUES (?, ?, ?, ?, ?);";
        const values = [nameTarea, estado, descripcion, idUser, false];
        await dbconnection.execute(query, values);
        const [data] = await dbconnection.execute("SELECT LAST_INSERT_ID();");
        res.status(201).json(data); // 201: CREATED SUCESSFULLY
      } catch (error: any) {
        res.status(500).json({ POST_ERROR: error.message });
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        const query = "UPDATE tarea SET deleted = ? WHERE (id = ?);";
        const values = [true, id];
        const [data] = await dbconnection.execute(query, values);

        res.status(201).json(data);
      } catch (error: any) {
        res.status(500).json({ PUT_ERROR: error.message });
      }
      break;
    case "PATCH":
      try {
        const { id, state } = body;
        const query = "UPDATE tarea SET estado = ? WHERE (id = ?);";
        const values = [state, id];
        const [data] = await dbconnection.execute(query, values);

        res.status(201).json(data);
      } catch (error: any) {
        res.status(500).json({ PATCH_ERROR: error.message });
      }
      break;
    default:
      res.status(500).json({ method: "invalid" }); // 500: ERROR
      break;
  }
  dbconnection.end();
}
