import db from '../config/dbConnect.js';

 function ObterCursos(){
    const cursos = db.query('select * from shae_db.curso');
    return cursos;
}

export default ObterCursos();