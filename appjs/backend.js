// impor modul express
const express = require('express')

// membuat variabel backend yang menyimpan instance dari objek yang dibuat dari fungsi express()
const backend = express()

// Middleware untuk menambahkan header CORS
backend.use((req, res, next) => {
    // Menetapkan header Access-Control-Allow-Origin untuk mengizinkan akses dari semua origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Menetapkan header Access-Control-Allow-Methods untuk menetapkan metode HTTP yang diizinkan
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Menetapkan header Access-Control-Allow-Headers untuk menetapkan header yang diizinkan dalam permintaan
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Melanjutkan ke middleware atau handler selanjutnya
    next();
});


// import file routes.js untuk menangani routing
const router = require('./backend/routes')

const logger = require('morgan');

// // impor file mysql untuk koneksi
// const connection = require('../appjs/config/mysql')

// Menggunakan middleware logging yang telah diimpor
backend.use(logger('dev'));
// menggunakan router yang telah diimpor untuk menangani permintaan HTTP pad enpoint utama '/'
backend.use('/api/v1', router);

// Membuat routing untuk memangani error
backend.use((req, res, next) => {
    res.status(404)
    res.send({
        status: 'failed',
        message: 'Resource ' +  req.original + ' Not Found'
    })
})


// Untuk menjalankannya
// Menerima permintaan HTTP pada port 3000 di localhost
backend.listen(3000, () => console.log('Server: http://localhost:3000'));

