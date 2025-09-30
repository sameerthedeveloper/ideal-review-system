import React, { useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import AdminPanel from './adminPanel';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }
        try {
            const adminCol = collection(db, 'admin');
            const snapshot = await getDocs(adminCol);
            const trimmedUsername = username.trim();
            const trimmedPassword = password.trim();
            const found = snapshot.docs.some(doc => {
                const data = doc.data();
                return (
                    data.username === trimmedUsername &&
                    data.password === trimmedPassword
                );
            });
            if (found) {
                setLoggedIn(true);
            } else {
                setError('Incorrect username or password');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    if (loggedIn) {
        return <AdminPanel />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
