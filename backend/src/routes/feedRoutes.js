import  express  from "express";

import feedController from "../controllers/feedController.js"

const router = express.Router();

router

.get("/feed/:id_conteudo",feedController.listarFormQuestionario)

export default router
