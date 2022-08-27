import db from '../config/dbConnect.js';


//cadastrar curso,topico,conteudo
//pode existir mais de um topico cadastrado ao mesmo curso
//pode existir mais de um conteudo cadastrado do mesmo topico

class MateriaController {

    static listarCursos = async (req, res) => {
        const user_id_especialista = parseInt(req.params.id);
        await db.query(`SELECT * FROM shae_db.curso WHERE user_id_especialista = $1;`, [user_id_especialista])

            .then((result => {

                const cursos = result
                if (cursos.length > 0) {
                    res.status(200).send(
                        cursos
                    );
                } else {
                    res.status(400).send({
                        message: "Professor não possui cursos cadastrados no momento!"
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

    static listarTopicos = async (req, res) => {
        const id_curso = parseInt(req.params.idCurso);
        await db.query(`SELECT id_topico, descricao, ordem, id_curso FROM shae_db.topico where id_curso = $1;`, [id_curso])
            .then((result => {
                const topicos = result
                if (topicos.length > 0) {
                    res.status(200).send(
                        topicos
                    );
                } else {
                    res.status(400).send({
                        message: "Professor não possui topicos  referente a este curso!"
                    }
                    )
                };
            })).catch((error) => {
                res.status(400)

                    .send(
                        ` Erro: ${error}`
                    );
                console.log(error)
            })

    }

    static listarConteudo = async (req, res) => {
        const id_topico = parseInt(req.params.id_topico)
        await db.query(`SELECT id_conteudo, descricao, tipo, ordem, id_topico, descricao_texto, url_video_imagem FROM shae_db.conteudo where id_topico = $1;`, [id_topico])
            .then((result => {
                const conteudos = result
                if (conteudos.length > 0) {
                    res.status(200).send(
                        conteudos
                    );
                } else {
                    res.status(400).send({
                        message: "Professor não possui Conteudos referente a este topico!"
                    }
                    )
                };
              
            })).catch((error) => {
                res.status(400)
                    .send(
                        ` Erro: ${error}`
                    );
                console.log(error)
            })

    }

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

    static criarNovoTopico = async (req, res) => {
        const { descricao,id_curso } = req.body;
        const rows = await db.query(
            `INSERT INTO shae_db.topico(descricao, id_curso)VALUES($1,$2);`,[descricao,id_curso]
        ).then((result => {
            res.status(201).send({
                message: "Topico gravado com sucesso!",
            });
        })).catch((error) => {
            res.status(400)

                .send(
                    ` Erro: ${error}`
                );
            console.log(error)
        })
    };

    static criarNovoConteudo = async (req, res) => {
        const { descricao,tipo,id_topico,descricao_texto,url_video_imagem } = req.body;
        //se o conteudo gravado for do tipo video o paremetro descricao_texto vai vazio  
        //se o conteudo gravado for do tipo texto o paremetro vai url video imagem vai vazio 
        //se o conteudo gravado for do tipo imagem o paremetro descricao_texto vai vazio 
        const rows = await db.query(
            `INSERT INTO shae_db.conteudo(descricao, tipo, id_topico, descricao_texto, url_video_imagem) VALUES($1,$2,$3,$4,$5);`,[descricao,tipo,id_topico,descricao_texto,url_video_imagem]
        ).then((result => {
            res.status(201).send({
                message: "Conteudo gravado com sucesso!",
            });
        })).catch((error) => {
            res.status(400)

                .send(
                    ` Erro: ${error}`
                );
            console.log(error)
        })
    };

    static criarNovoConteudoQuestionario = async (req, res) => {
        const { descricao,id_conteudo } = req.body;
        //se o conteudo gravado for do tipo video o paremetro descricao_texto vai vazio  
        //se o conteudo gravado for do tipo texto o paremetro vai url video imagem vai vazio 
        //se o conteudo gravado for do tipo imagem o paremetro descricao_texto vai vazio 
        const rows = await db.query(

            // `INSERT INTO shae_db.questionario
            // (descricao, id_conteudo)
            // VALUES('Dado o conjunto A = {1,2,5, 10, 15, 28}, o número de subconjuntos possíveis para esse conjunto é ?', 10);`
            `INSERT INTO shae_db.questionario(descricao, id_conteudo) VALUES($1,$2);`,[descricao,id_conteudo]   
        ).then((result => {
            res.status(201).send({
                message: "questão gravada com sucesso!",
            });
        })).catch((error) => {
            res.status(400)

                .send(
                    ` Erro: ${error}`
                );
            console.log(error)
        })
    };

    static criarRespostasQuestionario = async (req, res) => {
        const { descricao,ordem,resposta_correta,id_questionario } = req.body;
        //se o conteudo gravado for do tipo video o paremetro descricao_texto vai vazio  
        //se o conteudo gravado for do tipo texto o paremetro vai url video imagem vai vazio 
        //se o conteudo gravado for do tipo imagem o paremetro descricao_texto vai vazio 
        const rows = await db.query(
            `INSERT INTO shae_db.alternativa_questionario(descricao, ordem, resposta_correta, id_questionario)VALUES($1,$2,$3,$4);`,[descricao,ordem,resposta_correta,id_questionario] 
        ).then((result => {
            res.status(201).send({
                message: "alternativa gravada com sucesso!",
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

export default MateriaController;
