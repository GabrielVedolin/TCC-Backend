import express  from "express";
import MateriaController from "../controllers/materiasController.js";

const router = express.Router();

router
    .get("/Materias",MateriaController.listarMaterias)
    .get("/Materias/:id",MateriaController.listarMateriasPorId)
    .post("/Materias",MateriaController.cadastrarMateria)
    .put("/Materias/:id",MateriaController.atualizarMateria)
    .delete("Materias/:id",MateriaController.excluirMateria)
export default router;