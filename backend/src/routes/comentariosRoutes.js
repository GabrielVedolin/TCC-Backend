import express  from "express";
 import ComentariosController from "../controllers/comentariosController.js";

const router = express.Router();

router
    .get("/comentarios/:id_conteudo",ComentariosController.listarComentarioConteudo)
    .post("/cadastrarComentario",ComentariosController.criarNovoComentario)

export default router;