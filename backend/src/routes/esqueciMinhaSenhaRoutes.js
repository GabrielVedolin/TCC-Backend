import  express  from "express";

import esqueciMinhaSenhaController from "../controllers/esqueciMinhaSenhaController.js"

const router = express.Router();

router

.put("/esqueciMinhaSenha",esqueciMinhaSenhaController.esqueciSenha)

export default router
