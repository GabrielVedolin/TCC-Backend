import pgPromise from 'pg-promise';
const pgp = pgPromise();

const cn = {
    host: 'ec2-50-19-255-190.compute-1.amazonaws.com',
    port: 5432,
    database: 'de67a2stf4tsc2',
    user: 'gadpffmonctxbl',
    password: '8908b69b11b078c19ee8e791042bd7ee0a24fc9729062c77fea0791c91dc6c02',
    ssl: {rejectUnauthorized : false}
    //max: 30 // use up to 30 connections
    // "types" - in case you want to set custom type parsers on the pool level
};


const db = pgp(cn);
// or 


// const db = 
//     pgp('postgres://gadpffmonctxbl:8908b69b11b078c19ee8e791042bd7ee0a24fc9729062c77fea0791c91dc6c02@ec2-50-19-255-190.compute-1.amazonaws.com:5432/de67a2stf4tsc2');

export default db;