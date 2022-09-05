import  express  from "express";


import favoritarController from "../controllers/favoritarMateriaController.js";

const router = express.Router();

router

.get("/favoritos/:user_id_aprendiz",favoritarController.listarFavoritos)
.post("/adicionarFavoritos",favoritarController.adicionarFavoritos)

export default router
