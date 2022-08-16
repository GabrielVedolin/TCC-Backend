import materias from "../models/Materia.js";
import db from '../config/dbConnect.js';

async function ObterMaterias(){
    const materias = await db.query('select * from shae_db.materia');
    return materias;
}

class MateriaController {

    static listarMaterias = async(req, res) =>{
       //const Materias = await Materias.ObterMaterias();
       const materias = await ObterMaterias();
       console.log(materias);
       if (materias != null) {
        res.status(200).json(materias);        
       }else{
        res.status(400).send({message: `${err.message} - Materia não encontrado`})
       }


    }

    static listarMateriasPorId = (req,res) =>{
        const id = req.params.id;

        Materias.findById(id,(err,Materias) =>{
            if(err) {
                res.status(400).send({message: `${err.message} - Id do Materia não encontrado`})
            }else{
                res.status(200).send(livros);
            }
        })
    }

    static cadastrarMateria = (req, res) =>{
        let Materia = new materias(req.body);
        
        Materia.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar Materia.`})
            }else
            {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarMateria = (req,res) => {
        const id = req.params.id;

        //Materias.findByIdAndUpdate(id)
    }

    static excluirMateria = (req,res) =>{
        const id = req.params.id;

        //Materias.findByIdAndDelete(id)
    }

}

export default MateriaController;
