import db from '../config/dbConnect.js';

class formularioPedagogicoController {

    static GravarFormulario = async (req, res) => {

        // const arr = [user_id_aprendiz,id_pergunta,resposta,peso,tipo_alternativa]

        // const { user_id_aprendiz,id_pergunta,resposta,peso,tipo_alternativa } = req.body;
        // const arr = [req.body.user_id_aprendiz,req.body.id_pergunta,req.body.resposta,req.body.peso,req.body.tipo_alternativa]

        // let my_array = new array('x', 'y', 'z')
        // let arr2 = [ {"user_id_aprendiz":3,"id_pergunta":10,"resposta":2,"peso":15," tipo_alternativa":"video"},
        // {"user_id_aprendiz":4,"id_pergunta":10,"resposta":2,"peso":16," tipo_alternativa":"video"},
        // {"user_id_aprendiz":4,"id_pergunta":10,"resposta":2,"peso":17," tipo_alternativa":"video"}]

        let arr2 = req.body

        


   for(let i = 0;i<arr2.length;i++){
     db.any(
        `INSERT INTO shae_db.questionario_pedagogico
        (user_id_aprendiz, id_pergunta, resposta, peso, tipo_alternativa)
        VALUES($1:list)`,[arr2[i]]
    ).then((result)=>{
        console.log(result)

    }).catch((error)=>{
        res.status(201).send({
            message: "erro",
        });
        console.log("dentro do catch ",error)

    })
   }
       

       
    }

}

export default formularioPedagogicoController;

