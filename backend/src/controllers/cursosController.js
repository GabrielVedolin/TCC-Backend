import cursos from "../models/Curso.js";
import db from '../config/dbConnect.js';

async function ObterCursos(){
    const cursos = await db.query('select * from shae_db.curso');
    return cursos;
}

class CursoController {

    static listarCursos = async(req, res) =>{
       //const cursos = await cursos.ObterCursos();
       const cursos = await ObterCursos();
       console.log(cursos);
       if (cursos != null) {
        res.status(200).json(cursos);        
       }else{
        res.status(400).send({message: `${err.message} - curso não encontrado`})
       }


    }

    static listarCursosPorId = (req,res) =>{
        const id = req.params.id;

        cursos.findById(id,(err,cursos) =>{
            if(err) {
                res.status(400).send({message: `${err.message} - Id do curso não encontrado`})
            }else{
                res.status(200).send(livros);
            }
        })
    }

    static cadastrarCurso = (req, res) =>{
        let curso = new cursos(req.body);
        
        curso.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar curso.`})
            }else
            {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarCurso = (req,res) => {
        const id = req.params.id;

        //cursos.findByIdAndUpdate(id)
    }

    static excluirCurso = (req,res) =>{
        const id = req.params.id;

        //cursos.findByIdAndDelete(id)
    }

}

export default CursoController;
