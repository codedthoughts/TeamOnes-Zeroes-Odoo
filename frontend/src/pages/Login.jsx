import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import useAuthStore from '../store/authStore';
import { socket } from '../lib/socket';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', formData);
            setAuth(res.data);
            socket.connect(); // Connect socket after successful login
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Login to StackIt</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-md" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border rounded-md" required />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Login</button>
            </form>
            <p className="text-center mt-4">
                Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
        </div>
    );
};
export default Login;