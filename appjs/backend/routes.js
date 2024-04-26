const router = require('express').Router();

const { response } = require('express');
// Import file mysql untuk membuat koneksi
const connection = require('../config/mysql');
const multisensorController = require('./contoller1')

router.get('/multisensor', multisensorController.index);

// Mendefinisikan rute HTTP GET untuk path '/'
// router.get('/multisensor', (req, res, next) => {
//     connection.connect();
//     connection.query({
//         sql: 'SELECT * FROM multisensor',
//     }, (error, result) => {
//         if(error) {
//             res.send({
//                 status: 'failed',
//                 response: 'failed to fetch data'
//             });
//         }else {
//             res.send({
//                 status: 'success',
//                 response: result
//             });
//         }
//     });
// });


// Mengekspor router agar dapat digunakan di file lain
module.exports = router;
