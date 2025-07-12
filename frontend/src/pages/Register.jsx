import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import useAuthStore from '../store/authStore';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/register', formData);
            setAuth(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}
                <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-3 border rounded-md" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-md" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border rounded-md" required />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Register</button>
            </form>
            <p className="text-center mt-4">
                Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </div>
    );
};
export default Register;