const { tasks } = require('../models');

exports.getAllTasks = async (req, res, next) => {
    try {
        const results = await tasks.findAll();
        res.status(200).json({ tasks: results });
    } catch (err) {
        next(err);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await tasks.findByPk(id);
        if (!result) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(200).json({ task: result });
    } catch (err) {
        next(err);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { name_tasks } = req.body;
        const newTask = await tasks.create({ name_tasks });
        res.status(201).json({ task: newTask });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_tasks, completed } = req.body;
        const taskToUpdate = await tasks.findByPk(id);

        if (!taskToUpdate) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        taskToUpdate.name_tasks = name_tasks;
        taskToUpdate.completed = completed;
        await taskToUpdate.save();

        res.status(200).json({ task: taskToUpdate });
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const taskToDelete = await tasks.findByPk(id);
        
        if (!taskToDelete) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        
        await taskToDelete.destroy();
        res.status(200).json({ message: 'Task deleted successfully!' });
    } catch (err) {
        next(err);
    }
};
