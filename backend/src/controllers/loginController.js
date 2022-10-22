import db from '../config/dbConnect.js';

class loginController {

    static login = async (req, res) => {
        const { user_email, user_senha } = req.body;

        if (user_email && user_senha) {
            const rows = await db.query(
                `SELECT * FROM shae_db.usuario WHERE user_email = $1 and user_senha = $2;`, [user_email, user_senha])
                .then((result) => {
                    const user = result
                    if (user.length > 0) {
                        res.status(200).send(
                            user
                        );
                    } else {
                        res.status(400).send({
                            message: "email ou senha invalidos"
                        })
                    }
                }).catch((error) => {
                    res.status(400)
                        .send(
                            ` Erro: ${error}`
                        );
                    console.log(error)
                })
        }
        else {
            res.send('Por favor preencha o campo email e senhha')
        }
    }

}

export default loginController;

