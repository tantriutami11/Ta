// Membuat middleware logging untuk mencatat infomasi permintaan
const log  = (req, res, next) => {
    //
    console.log(new Date().toLocaleDateString(),'=>', req.method, req.originalUrl);
    // Memanggil fungsi next untuk meneruskan kontrol ke middleware atau handler selanjutnya
    next();
}

//Mengekspor middleware logging agar dapat digunakan difine lain
module.exports = log;