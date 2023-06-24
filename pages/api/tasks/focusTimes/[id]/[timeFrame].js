import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

export default async function handler(req, res) {
  const dbconnection = await connect();
  const { id, timeFrame } = req.query;

  try {
    let date = new Date();
    let day = date.getDate() - timeFrame;
    let month;
    if (day < 0) {
      day = 0;
      month = date.getMonth() - 1;
    } else {
      month = date.getMonth();
    }
    let year = date.getFullYear();
    date = new Date(year, month, day);

    const query =
      "SELECT * FROM concentracion WHERE idUser=? AND horaAndFecha>?";
    const [data] = await dbconnection.execute(query, [
      id,
      date.toISOString().slice(0, 19).replace("T", " "),
    ]);

    res.status(200).json({ focusTime: data }); // 200: OK (Exito genérico)
  } catch (error) {
    res.status(500).json({ GET_ERROR: error.message });
  }

  dbconnection.end();
}
