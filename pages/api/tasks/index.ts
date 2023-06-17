import { NextApiRequest, NextApiResponse } from "next";

import mysql from "mysql2/promise"

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {method, body} = req
    //console.log(`method:${method}`)
    //console.log(`body:${body}`)
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "fungidb",
        //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    })
    try {    
        switch (method) {
            case "GET":
                try {
                    const query = "SELECT * from tarea"
                    //@ts-ignore
                    const values = []
                    //@ts-ignore
                    const [data] = await dbconnection.execute(query, values)
                
                    res.status(200).json({ tasks: data }) // 200: OK (Exito genérico)
                } catch (error:any ) {
                    res.status(500).json({GET_ERROR: error.message})
                }
                break;
            case "POST":
                try {
                    const {nameTarea, estado, descripcion, idUser} = body
                    const query = "INSERT INTO tarea(nameTarea, estado, descripcion, idUser) VALUES (?, ?, ?, ?);"
                    const values = [nameTarea, estado, descripcion, idUser]
                    await dbconnection.execute(query, values)
                    const [data] = await dbconnection.execute("SELECT LAST_INSERT_ID();")
                    res.status(201).json(data) // 201: CREATED SUCESSFULLY
                } catch (error:any ) {
                    res.status(500).json({POST_ERROR: error.message})
                }
                break;
            case "DELETE":
                break;
            case "PATCH":
                try {
                    const {id, state} = body
                    //console.log("HOLA"+` id:${id}, state:${state}`)
                    
                    //res.status(201).json({"id":id, "state":state})
                    throw new Error("FUNCIONALIDAD AUN NO IMPLEMENTADA")
                } catch (error:any) {
                    res.status(500).json({PATCH_ERROR: error.message})
                }
                break;
            default:
                res.status(500).json({method:"invalid"}) // 500: ERROR
                break;
        }
    } catch (error: any) {
        res.status(500).json({ERROR: error.message})
    } finally {
        dbconnection.end()
    }
}