import React, { useEffect, useState } from 'react';
import { Task } from './components/Task';
import axios from 'axios';

export const Home = () => {
    const [user, setUser] = useState({});

    const ramdomUser = async () => {
        try {
            const { data } = await axios.get('https://randomuser.me/api/?inc=name');
            if (data.results.length > 0) {
                setUser(data.results[0].name);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        ramdomUser();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div>
                <h2>Bienvenido</h2>
                <button className='btn btn-success' onClick={ramdomUser}>Obtener nombre</button>
                <h3>
                    {user.first} {user.last}
                </h3>
            </div>
            <Task></Task>
        </div>
    );
}
