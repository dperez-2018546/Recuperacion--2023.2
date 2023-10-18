import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const NewTask = ({ getTasks }) => {
    const [formData, setFormData] = useState({ name: '', description: '', date: '', prority: '' })

    const saveTask = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3200/task/addTask', formData)
            getTasks()
            alert(data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="">Nombre: </label>
                <div>
                    <input onChange={handleChange} name='name' type="text" />
                </div>
                <label htmlFor="">Descripción: </label>
                <div>
                    <textarea onChange={handleChange} name="description" cols="30" rows="10"></textarea>
                </div>
                <label htmlFor="">Fecha: </label>
                <div>
                    <input onChange={handleChange} name='date' type="date" />
                </div>
                <label htmlFor="">Prioridad: </label>
                <div>
                    <input onChange={handleChange} name='priority' type="number" />
                </div>
                <button onClick={(e) => saveTask(e)} type='submit' className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}
