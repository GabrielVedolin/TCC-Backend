import db from '../config/dbConnect.js';


//cadastrar curso,topico,conteudo
//pode existir mais de um topico cadastrado ao mesmo curso
//pode existir mais de um conteudo cadastrado do mesmo topico

class ComentariosController {

    static listarComentarioConteudo = async (req, res) => {
        const id_conteudo = parseInt(req.params.id_conteudo);
        await db.query(`SELECT id_comentario, comentario, user_id, id_conteudo FROM shae_db.comentario_conteudo where id_conteudo = $1;`, [id_conteudo])

            .then((result => {

                const comentarios = result
                if (comentarios.length > 0) {
                    res.status(200).send(
                        comentarios
                    );
                } else {
                    res.status(400).send({
                        message: "não há comentarios para este conteudo"
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

    

    
    static criarNovoComentario = async (req, res) => {
        const { comentario,user_id,id_conteudo } = req.body;
        const rows = await db.query(
            `INSERT INTO shae_db.comentario_conteudo(comentario, user_id, id_conteudo)VALUES($1,$2,$3);`,[comentario,user_id,id_conteudo]
        ).then((result => {
            res.status(201).send({
                message: "Comentario enviado com sucesso!",
            });
        })).catch((error) => {
            res.status(400)

                .send(
                    ` Erro: ${error}`
                );
            console.log(error)
        })
    };
    static criarNovoCurso = async (req, res) => {
        const { descricao,user_id_especialista } = req.body;
        const rows = await db.query(
            `INSERT INTO shae_db.curso(descricao, user_id_especialista)VALUES($1,$2);`,[descricao,user_id_especialista]
        ).then((result => {
            res.status(201).send({
                message: "Curso  gravado com sucesso!",
            });
        })).catch((error) => {
            res.status(400)

                .send(
                    ` Erro: ${error}`
                );
            console.log(error)
        })
    };

}

export default ComentariosController;
