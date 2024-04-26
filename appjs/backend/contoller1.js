// // mengimpor modul Router dari library express dan disimpan divariabel router
// const router = require ('express').Router()

// impor file mysql untuk membuat koneksi
const connection = require('../config/mysql')

const index = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM multisensor',
    }, _response(res));
}

const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: 'failed to fetch data'
            });
        }else {
            res.send({
                status: 'success',
                response: result
            });
        }
    }
}


 

// Mengekspor router agar dapat digunakan difine lain
module.exports = {
    index
};