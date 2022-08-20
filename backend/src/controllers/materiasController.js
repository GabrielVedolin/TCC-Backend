// import materias from "../models/Materia.js";
import db from '../config/dbConnect.js';



async function ObterConteudo() {
    // const materias = await db.query('select * from Db_teste."conteudo"');
    const materias = await db.query(`Select a.id_materia,a.nome_materia,b."Id_curso",b.nome_curso,c."Id_topico",c.nome_topico from db_teste."Materia" as a
    left join db_teste."Curso" as b on a.id_materia = b.id_materia
    left join db_teste."Topico" as c on b."Id_curso" = c.id_curso`)
    return materias;
}

class MateriaController {

    static listarConteudos = async (req, res) => {
        //const Materias = await Materias.ObterMaterias();
        const materias = await ObterConteudo();

        if (materias != null) {
            res.status(200).json(materias);
           

        } else {
            res.status(400).send({ message: `${err.message} - Materia não encontrado` })
        }


    }

    // static listarMateriasPorId = (req,res) =>{
    //     const id = req.params.id;

    //     Materias.findById(id,(err,Materias) =>{
    //         if(err) {
    //             res.status(400).send({message: `${err.message} - Id do Materia não encontrado`})
    //         }else{
    //             res.status(200).send(livros);
    //         }
    //     })
    // }

    // static cadastrarMateria = (req, res) =>{
    //     let Materia = new materias(req.body);

    //     Materia.save((err) => {
    //         if (err) {
    //             res.status(500).send({message: `${err.message} - falha ao cadastrar Materia.`})
    //         }else
    //         {
    //             res.status(201).send(livro.toJSON())
    //         }
    //     })
    // }

    // static atualizarMateria = (req,res) => {
    //     const id = req.params.id;

    //     //Materias.findByIdAndUpdate(id)
    // }

    // static excluirMateria = (req,res) =>{
    //     const id = req.params.id;

    //     //Materias.findByIdAndDelete(id)
    // }
    static createProduct = async (req, res) => {
        const { desc_conteudo, tipo_conteudo, url_conteudo, usuario, id_materia, id_curso, id_topico } = req.body;
        console.log(req.body)
        const  rows  = await db.query(
            "INSERT INTO db_teste.conteudo (desc_conteudo,tipo_conteudo,url_conteudo,usuario,id_materia,id_curso,id_topico)VALUES ($1,$2,$3,$4,$5,$6,$7);",
            [desc_conteudo, tipo_conteudo, url_conteudo, usuario, id_materia, id_curso, id_topico]
            //   "INSERT INTO shae_db.materia (id_materia, descricao) VALUES ($1, $2);\
            //   INSERT INTO shae_db.materia (id_materia, descricao) VALUES ($1, $2)",
            //   [id_materia, descricao]
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

}

export default MateriaController;
