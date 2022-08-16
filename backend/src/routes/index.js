import express from "express";
import cursos from "./cursosRoutes.js";

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Plataforma de Cursos"})
    })
    app.use(
        express.json(),
        cursos
    )
}

export default routes;