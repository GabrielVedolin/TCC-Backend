import express  from "express";
import MateriaController from "../controllers/materiasController.js";

const router = express.Router();

router
    
    .get("/cursos/:id",MateriaController.listarCursos)
    .get("/listarTopicosPorCurso/:idCurso",MateriaController.listarTopicos)
    .get("/listarConteudoPorTopico/:id_topico",MateriaController.listarConteudo)
    .post("/cadastrarCurso",MateriaController.criarNovoCurso)
    .post("/cadastrarTopico",MateriaController.criarNovoTopico)
    .post("/cadastrarConteudo",MateriaController.criarNovoConteudo)
    .post("/cadastrarQuestionario",MateriaController.criarNovoConteudoQuestionario)
    .post("/cadastrarRespostaQuestionario",MateriaController.criarRespostasQuestionario)

export default router;