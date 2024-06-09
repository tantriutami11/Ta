const connection = require('../config/mysql');

const index = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM multisensor',
    }, _response(res));
}

const day = (req, res) => {
    connection.query({
        sql: 'SELECT id, sensor_ph, sensor_suhu, sensor_do, sensor_amonia, sensor_suhu_baterai, sensor_arus, sensor_tegangan, DATE_FORMAT(waktu, "%Y-%m-%d %H:%i:%s") as waktu FROM multisensor WHERE DATE(waktu) = CURDATE()',
    }, _response(res));
}

const week = (req, res) => {
    connection.query({
        sql: 'SELECT YEAR(waktu) AS year, WEEK(waktu) AS week, DATE(waktu) AS date, ' +
             'AVG(sensor_ph) AS sensor_ph_avg, ' +
             'AVG(sensor_suhu) AS sensor_suhu_avg, ' +
             'AVG(sensor_do) AS sensor_do_avg, ' +
             'AVG(sensor_amonia) AS sensor_amonia_avg, ' +
             'AVG(sensor_suhu_baterai) AS sensor_suhu_baterai_avg, ' +
             'AVG(sensor_arus) AS sensor_arus_avg, ' +
             'AVG(sensor_tegangan) AS sensor_tegangan_avg, ' +
             'DATE_FORMAT(MIN(waktu), "%Y-%m-%d %H:%i:%s") AS min_waktu, ' +
             'DATE_FORMAT(MAX(waktu), "%Y-%m-%d %H:%i:%s") AS max_waktu ' +
             'FROM multisensor WHERE waktu >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY year, week, date',
    }, _response(res));
}


const month = (req, res) => {
    connection.query({
        sql: 'SELECT YEAR(waktu) AS year, MONTH(waktu) AS month, ' +
             'AVG(sensor_ph) AS sensor_ph_avg, ' +
             'AVG(sensor_suhu) AS sensor_suhu_avg, ' +
             'AVG(sensor_do) AS sensor_do_avg, ' +
             'AVG(sensor_amonia) AS sensor_amonia_avg, ' +
             'AVG(sensor_suhu_baterai) AS sensor_suhu_baterai_avg, ' +
             'AVG(sensor_arus) AS sensor_arus_avg, ' +
             'AVG(sensor_tegangan) AS sensor_tegangan_avg, ' +
             'DATE_FORMAT(MIN(waktu), "%Y-%m-%d %H:%i:%s") AS min_waktu, ' +
             'DATE_FORMAT(MAX(waktu), "%Y-%m-%d %H:%i:%s") AS max_waktu ' +
             'FROM multisensor GROUP BY year, month',
    }, _response(res));
}


const _response = (res) => {
    return (error, result) => {
        if (error) {
            res.status(500).json({
                status: 'failed',
                response: 'Failed to fetch data'
            });
        } else {
            res.status(200).json({
                status: 'success',
                response: result
            });
        }
    }
}

module.exports = {
    index,
    day,
    week,
    month
};