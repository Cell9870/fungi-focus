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
  const dbconnection = await connect();
  const query = "SELECT * from user";
  const values: User[] = [];
  const [data] = await dbconnection.execute(query, values);
  dbconnection.end();

  res.status(200).json({ results: data });
}

/*
export default async (req:NextApiRequest, res: NextApiResponse) => {
    const { method, body} = req

    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM user'
                const response = await conn.query(query)
                
                return res.status(200).json(response.rows)
            } catch (error:any ) {
                return res.status(500).json({error: error.message})
            }
        case "POST":
            try {
                const { username, password} = body
                const query = 'INSERT INTO users(u_username, u_password) VALUES ($1, $2) RETURNING *'
                const values = [username, password]

                const response = await conn.query(query, values)

                return res.status(200).json(response.rows[0])
            } catch (error) {
                console.log(error)
            }
        default:
            return res.status(500).json({method:"invalid"})
    }
}*/
