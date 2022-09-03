import db from '../config/dbConnect.js';

class esqueciMinhaSenhaController {

    static esqueciSenha = async (req, res) => {
        const { user_senha, user_cpf } = req.body;

        if (user_senha && user_cpf) {
            const rows = await db.query(
                `select shae_db.usuarioAlterarSenha($1,$2);`, [user_cpf, user_senha]
            )
                .then((result) => {

                    const sucesso = result
                    if (sucesso[0].usuarioalterarsenha == true) {
                        res.status(200).send(
                            { message: "senha alterada com sucesso !" }
                        );
                    } else {
                        res.status(400).send({
                            message: "usuario não encontrado !"
                        })
                    }

                }).catch((error) => {
                    res.status(400)
                        .send(
                            ` Erro: ${error} !`
                        );
                    console.log(error)
                })
        }
        else {
            res.send('Por favor preencha o campo cpf e senha')
        }
    }

}

export default esqueciMinhaSenhaController;

