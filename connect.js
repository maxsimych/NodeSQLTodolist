const mysql = require('mysql');
require('dotenv').config();
    

const pool = mysql.createPool({
    connectionLimit: 5,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS, 
    database: process.env.MYSQL_DATABASE
});

pool.getConnection((err, con) => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server');
    let sql = `CREATE TABLE IF NOT EXISTS todos(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(255) NOT NULL,
                        completed TINYINT(1) NOT NULL DEFAULT 0
                    );`;
    con.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err.message);
        }
    });
    con.release();
});

pool.getConnection((err, con) => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    let sql = `CREATE TABLE IF NOT EXISTS users(
                id INT(11) PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(60)  UNIQUE KEY NOT NULL,
                pass VARCHAR(255) NOT NULL
            );`;
    con.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err.message);
        }
    });
    con.release();
});

module.exports = pool;