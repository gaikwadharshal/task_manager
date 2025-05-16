import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
};

export const addTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status, userId: req.user._id });
    res.status(201).json(task);
};

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
    );
    res.json(task);
};

export const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: 'Task deleted' });
};
