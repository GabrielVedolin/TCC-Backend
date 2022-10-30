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
        console.log(req.body);
        const { descricao_conteudo,tipo,id_topico,descricao_texto,url_video_imagem,descricao_questionario,alternativas } = req.body;
        //se o conteudo gravado for do tipo video o paremetro descricao_texto vai vazio  
        //se o conteudo gravado for do tipo texto o paremetro vai url video imagem vai vazio 
        //se o conteudo gravado for do tipo imagem o paremetro descricao_texto vai vazio 
        let returnIdconteudo = null;
        const rows = await db.query(
            `INSERT INTO shae_db.conteudo(descricao, tipo, id_topico, descricao_texto, url_video_imagem) VALUES($1,$2,$3,$4,$5) RETURNING id_conteudo;`,[descricao_conteudo,tipo,id_topico,descricao_texto,url_video_imagem]
        ).then((result => {
            returnIdconteudo = result[0];
            console.log("Conteudo gravado com sucesso!");
            if(tipo != "questionario")
            {
                res.status(201).send({
                    message: "Conteudo gravado com sucesso!",
                });
            }
        })).catch((error) => {
            res.status(400)
                .send(
                    ` Erro: ${error}`
                );
            console.log(error)
        })
        if(tipo == "questionario")
        {
            //se o conteudo gravado for do tipo video o paremetro descricao_texto vai vazio  
            //se o conteudo gravado for do tipo texto o paremetro vai url video imagem vai vazio 
            //se o conteudo gravado for do tipo imagem o paremetro descricao_texto vai vazio 
            let returnIdquestionario = null;
            const rowsQuestionario = await db.query(
                // `INSERT INTO shae_db.questionario
                // (descricao, id_conteudo)
                // VALUES('Dado o conjunto A = {1,2,5, 10, 15, 28}, o número de subconjuntos possíveis para esse conjunto é ?', 10);`
                `INSERT INTO shae_db.questionario(descricao, id_conteudo) VALUES($1,$2) RETURNING id_questionario`,[descricao_questionario, returnIdconteudo.id_conteudo]   
            ).then((result => {
                console.log(result[0]);
                returnIdquestionario = result[0]
                console.log("questão gravada com sucesso!");
            })).catch((error) => {
                res.status(400)
                    .send(
                        ` Erro: ${error}`
                    );
                console.log(error)
            });
            console.log('log rowsQuestionario: ' + rowsQuestionario);

            //const { descricao,ordem,resposta_correta} = req.body;

            //const arrayAlternativa = req.body;

            //se o conteudo gravado for do tipo video o paremetro descricao_texto vai vazio  
            //se o conteudo gravado for do tipo texto o paremetro vai url video imagem vai vazio 
            //se o conteudo gravado for do tipo imagem o paremetro descricao_texto vai vazio 
        
            console.log(alternativas);
            let values = 'VALUES';
            for (let i = 0; i < alternativas.length; i++) {
                values += ` ('${alternativas[i].descricao}', ${ alternativas[i].ordem}, ${ alternativas[i].resposta_correta}, ${returnIdquestionario}),`;    
            }
            values = values.substring(0, values.length - 1);
            console.log(values);

            const rowsAlternativa = await db.query(
                `INSERT INTO shae_db.alternativa_questionario(descricao, ordem, resposta_correta, id_questionario)${values};` 
            ).then((result => {
                res.status(201).send({
                    message: "formulario gravado com sucesso!",
                });
            })).catch((error) => {
                res.status(400)

                    .send(
                        ` Erro: ${error}`
                    );
                console.log(error)
            })
        }
    };

}

export default MateriaController;
