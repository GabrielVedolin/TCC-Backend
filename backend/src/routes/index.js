import express from "express";
import Materias from "./materiasRoutes.js";
import Comentarios from "./comentariosRoutes.js"
import login from "./loginRoutes.js";
import esqueciSenha from "./esqueciMinhaSenhaRoutes.js";

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Plataforma de Cursos"})
    })
    app.use(
        express.json(),
        Materias,
        Comentarios,
        login,
        esqueciSenha
        

    )
}

export default routes;