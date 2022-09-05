import db from '../config/dbConnect.js';

class favoritarController {

    static listarFavoritos = async (req, res) => {
        const user_id_aprendiz = parseInt(req.params.user_id_aprendiz);
        await db.query(`SELECT M.id_usuario_materia, M.user_id_aprendiz, M.user_id_materia, A.id_materia,A.descricao 
        FROM shae_db.usuario_materia M inner join shae_db.materia A  on  M.user_id_materia = A.id_materia where M.user_id_aprendiz = $1 ;`, [user_id_aprendiz])

            .then((result => {

                const favoritos = result
                if (favoritos.length > 0) {
                    res.status(200).send(
                        favoritos
                    );
                } else {
                    res.status(400).send({
                        message: "usuario não possui materias favoritas"
                    }
                    )
                }

            })).catch((error) => {
                res.status(400)

                    .send(
                        ` Erro: ${error}`
                    );
                console.log(error)
            })

    }
    static adicionarFavoritos = async (req, res) => {
        const {user_id_aprendiz, user_id_materia} = req.body;
        await db.query(`INSERT INTO shae_db.usuario_materia(user_id_aprendiz, user_id_materia) VALUES($1, $2);`, [user_id_aprendiz,user_id_materia])
            
            .then((result => {
                res.status(201).send({
                    message: "materia adicionada aos favoritos",
                });
            })).catch((error) => {
                res.status(400)
    
                    .send(
                        ` Erro: ${error}`
                    );
                console.log(error)
            })

    }


}

export default favoritarController;

