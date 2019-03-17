const express = require('express'),
    tasksCtrl = require('../controllers/tasks'),
    auth = require('../middleware/auth'),
    router = express.Router();

router.get('/', auth, tasksCtrl.getAllTasks)
.post('/', auth, tasksCtrl.addTask)
.put('/:id', auth, tasksCtrl.editTask)
.delete('/:id', auth, tasksCtrl.deleteTask)
.get('/done/', auth, tasksCtrl.getDone)
.put('/done/:id', auth, tasksCtrl.makeDone)
.get('/undone/', auth, tasksCtrl.getUndone)
.put('/undone/:id', auth, tasksCtrl.makeUndone);

module.exports = router;