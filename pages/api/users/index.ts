import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/database";

type User = {
  id: number;
  username: string;
  password: string;
};

export type { User };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const dbconnection = await connect();

  switch (method) {
    case "GET":
      const id = req.query.id;
      const query = "SELECT * from user WHERE id=?";
      const [data] = await dbconnection.execute(query, [id]);

      res.status(200).json({ users: data });
      break;
    case "POST":
      try {
        const { user } = body;
        console.log(user);
        const query =
          "INSERT INTO user(id, username, password) VALUES (?,?,?);";
        let data = await dbconnection.execute(query, [
          user.id,
          user.username,
          user.password,
        ]);

        res.status(201).json({ data });
      } catch (error: any) {
        res.status(500).json({ POST_ERROR: error.message });
      }
      break;
  }
  dbconnection.end();
}
