import  express  from "express";


import favoritarController from "../controllers/favoritarMateriaController.js";
import formularioPedagogicoController from "../controllers/formularioPedagogicoController.js";

const router = express.Router();

router

.post("/formulario",formularioPedagogicoController.GravarFormulario)

export default router
