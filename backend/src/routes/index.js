import express from "express";
import Materias from "./materiasRoutes.js";

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Plataforma de Cursos"})
    })
    app.use(
        express.json(),
        Materias
    )
}

export default routes;