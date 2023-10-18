'use strict'

const Task = require('./task.model')

exports.test = (req, res) => {
    res.send({ message: 'test fuction is running' })
}

//guadar
exports.addTask = async (req, res) => {
    try {
        let data = req.body
        if (data.priority < 1 || data.priority > 10)
            return res.status(404).send({ message: 'La prioridad debe ser entre 1 y 10' })

        let task = new Task(data)
        await task.save()
        return res.status(201).send({ message: 'Tarea creada' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al crear la tarea' });
    }
}

//eliminar
exports.deleteTask = async (req, res) => {
    try {
        let taskId = req.params.id
        //buscar que exista y eliminar
        let deleteTask = await Task.findOneAndDelete({ _id: taskId })
        if (!deleteTask) return res.status(404).send({ message: "Error al eliminar la tarea" })
        return res.status(200).send({ message: "Tarea eliminada" })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al eliminar la tarea' });
    }
}

//editar
exports.updateTask = async (req, res) => {
    try {
        //obtener el id
        let taskId = req.params.id
        //obtener los datos nuevos
        let data = req.body
        if (data.priority < 1 || data.priority > 10)
            return res.status(404).send({ message: 'La prioridad debe ser entre 1 y 10' })
        //buscar que exista ya la tareas
        let existTask = await Task.findOne({ name: data.name })
        if (existTask) return res.status(404).send({ message: 'Ya existe esa tarea y por ende no se actualizo' })
        //actualizar
        if (!existTask) {
            let updateTask = await Task.findOneAndUpdate(
                { _id: taskId },
                data,
                { new: true }
            )
            return res.send({ message: "Tarea actualizada", updateTask })
        }
        return res.send({ message: "Celalar not found and not updating" })
    } catch (err) {
        console.error(err)
    }
}

//listar
exports.getTask = async (req, res) => {
    try {
        //obtener los datos
        let tasks = await Task.find()
        return res.send({ message: 'Tareas:', tasks })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al obtener las tareas' });
    }
}