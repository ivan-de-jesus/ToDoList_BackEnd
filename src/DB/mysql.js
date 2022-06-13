const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function connectionMysql(){
    connection = mysql.createConnection(dbconfig);
    connection.connect((err)=>{
        if(err){
            console.log('Database error',err);
            setTimeout(connectionMysql, 200);
        }else{
            console.log('Connected database');
        }
    });
    connection.on('error', err =>{
        console.log('Database error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connectionMysql();
        }else{
            throw err;
        }
    })
}

connectionMysql();

function getAll(table){
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} `, (error, result) => {
            return  error  ? reject(error) : resolve(result);
        })
    });
}

function get(table, id){
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id} `, (error, result) => {
            return  error  ? reject(error) : resolve(result);
        })
    });
}

//get por status
function get(table, task_status){
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE task_status = ${task_status} `, (error, result) => {
            return  error  ? reject(error) : resolve(result);
        })
    });
}

function add(table, data){
    if (data && data.id == 0){
        return save(table, data);
    }else{
        return update(table, data);
    }
}
function save(table, data){
    console.log("Entro al save table")
    return new Promise ((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            return  error  ? reject(error) : resolve(result);
        })
    });
}
function update(table, data){
    return new Promise ((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            return  error  ? reject(error) : resolve(result);
        })
    });
}

function deleteTask(table, data){
    return new Promise ((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (error, result) => {
            return  error  ? reject(error) : resolve(result);
        })
    });
}


module.exports = {
    getAll,
    get,
    add,
    deleteTask
}