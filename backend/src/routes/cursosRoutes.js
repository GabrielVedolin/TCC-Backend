import express  from "express";
import CursoController from "../controllers/cursosController.js";

const router = express.Router();

router
    .get("/cursos",CursoController.listarCursos)
    .get("/cursos/:id",CursoController.listarCursosPorId)
    .post("/cursos",CursoController.cadastrarCurso)
    .put("/cursos/:id",CursoController.atualizarCurso)
    .delete("cursos/:id",CursoController.excluirCurso)
export default router;