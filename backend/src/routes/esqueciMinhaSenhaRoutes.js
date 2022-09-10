import  express  from "express";

import esqueciMinhaSenhaController from "../controllers/esqueciMinhaSenhaController.js"

const router = express.Router();

router

.post("/esqueciMinhaSenha",esqueciMinhaSenhaController.esqueciSenha)

export default router
