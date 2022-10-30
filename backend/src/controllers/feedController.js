import db from '../config/dbConnect.js';

class FeedController {

    static listarFormQuestionario = async (req, res) => {
        const id_conteudo = parseInt(req.params.id_conteudo);
        
        let formQuestionario = []
        await db.query(`select q.id_questionario,q.descricao,q.id_conteudo 
                                from shae_db.questionario q where q.id_conteudo = $1;`, [id_conteudo])
            .then((result => {

                formQuestionario[0] = result
                if (formQuestionario.length > 0) {
                    console.log('foi o questionario');
                } else {
                    res.status(400).send({
                        message: "não há questionarios cadastrados no momento!"
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
            
        await db.query(`select aq.id_alternativa_questionario,aq.descricao as descricao_alternativa, aq.ordem, aq.resposta_correta 
                                from shae_db.alternativa_questionario aq 
                                where id_questionario = $1;`, [formQuestionario[0][0].id_questionario])
            .then((result => {

                formQuestionario[1] = result
                if (formQuestionario.length == 0) {
                    console.log('foi as alternativas');
                } else {
                    res.status(400).send({
                        message: "não há Alternativas para os questionarios cadastrados no momento!"
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

            res.status(200)
            .send(
                formQuestionario
            )

    }

}

export default FeedController;