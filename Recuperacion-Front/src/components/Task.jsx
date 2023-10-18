import React, { useEffect, useState } from 'react'
/* import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js' */
import axios from 'axios';
import { NewTask } from './NewTask.jsx';

export const Task = () => {
    const [tasks, setTasks] = useState([{}])

    const getTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:3200/task/getTask')
            if (data.tasks) {
                setTasks(data.tasks)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3200/task/deleteTask/${id}`)
            alert(data.message)
            getTasks()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getTasks() }, [])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div>
                    <h2>Tus tareas</h2>
                    <div className='container-fluid'>
                        <table className='table'>
                            <thead>
                                <tr><th >#</th><th >Nombre</th><th >Descripcion</th><th >Fecha</th><th>Prioridad</th><th>Acciones</th></tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map(({ _id, name, description, date, priority }, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{name}</td>
                                                <td>{description}</td>
                                                <td>{date}</td>
                                                <td>{priority}</td>
                                                <td><button className='btn btn-danger' onClick={() => deleteTask(_id)}>Elim</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2>Agrege una tarea</h2>
                    <NewTask setTasks={tasks} tasks={tasks} getTasks={getTasks}></NewTask>
                </div>
            </div>
        </>
    )
}
