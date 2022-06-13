const db = require('../../DB/mysql')
const TABLA = 'to_do_list'

function getAll() {
    return db.getAll(TABLA);
}

function get(id) {
    return db.get(TABLA, id);
}

function getByStatus(status) {
    return db.getByStatus(TABLA, status);
}

function add(body) {
    return db.add(TABLA, body);
}

function deleteTask(body) {
    return db.deleteTask(TABLA, body);
}

module.exports = {
    getAll,
    getByStatus,
    get,
    add,
    deleteTask,
}