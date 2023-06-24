import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbconnection = await connect();
  const { method, body } = req;

  try {
    let id = req.query.id;
    const query = "SELECT * FROM concentracion WHERE idUser=?";
    const [data] = await dbconnection.execute(query, [id]);

    res.status(200).json({ focusTime: data }); // 200: OK (Exito genérico)
  } catch (error: any) {
    res.status(500).json({ GET_ERROR: error.message });
  }

  dbconnection.end();
}
