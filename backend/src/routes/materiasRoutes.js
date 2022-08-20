import express  from "express";
import MateriaController from "../controllers/materiasController.js";

const router = express.Router();

router
    .get("/Materias",MateriaController.listarConteudos)
    // .get("/Materias/:id",MateriaController.listarMateriasPorId)
    .post("/Materias",MateriaController.createProduct)
    // .put("/Materias/:id",MateriaController.atualizarMateria)
    // .delete("Materias/:id",MateriaController.excluirMateria)
export default router;