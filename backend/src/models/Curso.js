import db from '../config/dbConnect.js';

 function ObterCursos(){
    const cursos = db.query('select * from shae_db_local.cursos');
    return cursos;
}

export default ObterCursos();