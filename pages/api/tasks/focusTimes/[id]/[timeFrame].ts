import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbconnection = await connect();
  const { id, timeFrame } = req.query;

  try {
    //TODO query para las estadisticas
    // en stats
    // fetch(localhost:3000/api/tasks/focusTimes/{idUser}/{timeFrame})
    const query = "SELECT * FROM concentracion WHERE idUser=?";
    const [data] = await dbconnection.execute(query, [id]);

    res.status(200).json({ focusTime: data }); // 200: OK (Exito genérico)

  } catch (error: any) {
    res.status(500).json({ GET_ERROR: error.message });
  }

  dbconnection.end();
}
