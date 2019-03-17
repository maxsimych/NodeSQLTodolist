const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
    bcrypt.hash(req.body.pass,10).then(
        (hash) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error('error: ' + err.message);
                    res.status(503).json({
                        message: 'Database server is down'
                    });
                };
                let sql = `INSERT INTO users(email,pass) VALUES ('${req.body.email}', '${hash}')`;
                con.query(sql, (err, rows, fields) => {
                    if (err) {
                        console.error('error: ' + err.message);
                        res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                });
                res.status(200).json({
                    message: 'Successfully signed up!'
                });
                con.release();
            });
    }).catch((error) => {
        res.status(501).json({
            error: error
        });
    });
};
exports.login = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `SELECT id, pass FROM users WHERE email = '${req.body.email}';`
        con.query(sql, (err, rows, fields) => {
            if (!rows[0]) {
                return res.status(401).json({
                    error: new Error('User not found!').message
                });
            };
            bcrypt.compare(req.body.pass, rows[0].pass).then(
                (valid) => {
                    if(!valid){
                        return res.status(401).json({
                            error: new Error('Incorrect password!').message
                        });
                    };
                    const token = jwt.sign(
                        { userId: rows[0].id },
                        process.env.JWT_SECURE_KEY,
                        { expiresIn: '24h'});
                    res.status(200).json({
                        userId: rows[0].id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error.message
                    });
                }
            );
        });
        con.release();
    });
}