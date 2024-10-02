import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//logout feature implementation
const Logout = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logout } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        try {
            logout(username, password);

        } catch (err) {
            console.log(err)
            setError('Failed to log out..');
        }
    }, []);




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">

                <div className="mt-8 space-y-6" >
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">You are Signed out </h2>
                </div>
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => nav('/')}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default Logout;