pool = require('../connect');

exports.getAllTasks = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = 'SELECT * FROM todos;';
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                let tasks = '';
                for(let i = 0; i < rows.length; i++) {
                    if (!i) {
                        tasks += '[';
                    } else {
                        tasks += ', ';
                    };
                    tasks += `{'id': ${rows[i].id}, 'title': '${rows[i].title}', 'completed': ${rows[i].completed}}`;
                    if (i === rows.length-1) {
                        tasks += ']';
                    }
                };         
                res.status(200).json(tasks);
            }
    
        });
        con.release();
    });
};
exports.addTask = (req,res,next) => {

    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `INSERT INTO todos(title,completed) VALUES ('${req.body.title}', false)`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            }
        });
        res.status(200).json({
            message: 'Successfully added new task'
        });
        con.release();
    });
    
    
};
exports.editTask = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `UPDATE todos SET
                    title = '${req.body.title}',
                    completed = ${req.body.completed}
                WHERE id = ${req.params.id};`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                res.status(200).json({
                    message: 'Edited successfully!'
                });
            };         
        });
        con.release();
    });
};
exports.deleteTask = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `DELETE FROM todos WHERE id = ${req.params.id}`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                res.status(200).json({
                    message: 'Deleted successfully!'
                });
            };         
        });
        con.release();
    });
};
exports.getDone = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `SELECT * FROM todos WHERE completed = 1`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                let tasks = '';
                for(let i = 0; i < rows.length; i++) {
                    if (!i) {
                        tasks += '[';
                    } else {
                        tasks += ', ';
                    };
                    tasks += `{'id': ${rows[i].id}, 'title': '${rows[i].title}', 'completed': ${rows[i].completed}}`;
                    if (i === rows.length-1) {
                        tasks += ']';
                    }
                };         
                res.status(200).json(tasks);
            }       
        });
        con.release();
    });
};
exports.makeDone = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `UPDATE todos SET
                    completed = 1
                WHERE id = ${req.params.id};`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                res.status(200).json({
                    message: 'Marked as done!'
                });
            };         
        });
        con.release();
    });
};
exports.getUndone = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `SELECT * FROM todos WHERE completed = 0`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                let tasks = '';
                for(let i = 0; i < rows.length; i++) {
                    if (!i) {
                        tasks += '[';
                    } else {
                        tasks += ', ';
                    };
                    tasks += `{'id': ${rows[i].id}, 'title': '${rows[i].title}', 'completed': ${rows[i].completed}}`;
                    if (i === rows.length-1) {
                        tasks += ']';
                    }
                };         
                res.status(200).json(tasks);
            }       
        });
        con.release();
    });
};
exports.makeUndone = (req,res,next) => {
    pool.getConnection((err, con) => {
        if (err) {
            console.error('error: ' + err.message);
            res.status(503).json({
                message: 'Database server is down'
            });
        };
        let sql = `UPDATE todos SET
                    completed = 0
                WHERE id = ${req.params.id};`;
        con.query(sql, (err, rows, fields) => {
            if (err) {
                console.error('error: ' + err.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            } else {
                res.status(200).json({
                    message: 'Marked as undone!'
                });
            };         
        });
        con.release();
    });
};
