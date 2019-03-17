const express = require('express'),
    bodyParser = require('body-parser'),
    tasksRoutes = require('./routes/tasks'),
    userRoutes = require('./routes/user')
    app = express();

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})
.use(bodyParser.json())

.use('/api/tasks', tasksRoutes)
.use('/api/auth', userRoutes);

module.exports = app;