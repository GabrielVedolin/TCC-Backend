import db from '../config/dbConnect.js';

 function ObterMaterias(){
    const materias = db.query('select * from shae_db.materia');
    return materias;
}

export default ObterMaterias();