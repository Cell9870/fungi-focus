import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbconnection = await connect();

  try {
    let id = req.query.id;
    const query = "SELECT * FROM tarea WHERE idUser=? AND deleted=?";
    const [data] = await dbconnection.execute(query, [id, false]);

    res.status(200).json({ tasks: data }); // 200: OK (Exito genérico)
  } catch (error: any) {
    res.status(500).json({ GET_ERROR: error.message });
  }
  dbconnection.end();
}