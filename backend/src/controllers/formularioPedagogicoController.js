import db from '../config/dbConnect.js';

class formularioPedagogicoController {

    static GravarFormulario = async (req, res) => {  
    let arr2 = req.body
    const id_user = arr2[0].user_id_aprendiz;

    try{
        for(let i = 0;i<arr2.length;i++){
        let sql = await db.any(`INSERT INTO shae_db.questionario_pedagogico(user_id_aprendiz, id_pergunta, resposta, peso, tipo_alternativa)VALUES($1:list)`, [arr2[i]]);
        }
       
        let sql2 = await db.any(`select * from shae_db.usuarioAlteraStatus($1)`,[id_user])
        .then((resp)=>{
            console.log(resp)
            console.log()
            res.status(200).json({ 
                message:"dados gravados com sucesso e flag alterada com sucesso"
            })

        }).catch((erro)=>{
            console.log(erro)
            res.status(400).json({
            message:"houve um erro com sua solicitação"
        })
        })

       
    }catch(err){
        console.log(err)
        res.status(400).json({
            message:"houve um erro com sua solicitação",messegaBD:err
        })
    }

    }
    

}

export default formularioPedagogicoController;

