// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useNotificationStore from '../store/notificationStore'; // Correct import
import { useSocketManager } from '../hooks/useSocket'; // Correct import
import { Bell, LogOut, MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, token, logout } = useAuthStore();
    const navigate = useNavigate();

    // This hook runs in the background to manage our socket connection
    useSocketManager(); 
    
    // This subscribes the Navbar component to changes in the notification store
    const { notifications, clearNotifications } = useNotificationStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNotificationClick = (notification) => {
        // Here you would ideally make an API call to mark it as read on the backend
        setShowNotifications(false);
        clearNotifications(); // Clear notifications from the bell
        navigate(notification.link);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">StackIt</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/ask" className="hidden sm:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            <MessageSquarePlus size={18} />
                            <span>Ask Question</span>
                        </Link>
                        {token ? (
                            <>
                                <div className="relative">
                                    <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
                                        <Bell className="cursor-pointer text-gray-600 hover:text-blue-600" />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </button>
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border">
                                            <div className="p-3 font-bold border-b">Notifications</div>
                                            <div className="py-1">
                                                {notifications.length > 0 ? (
                                                    notifications.map(n => (
                                                        <div key={n._id} onClick={() => handleNotificationClick(n)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            {n.message}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="px-4 py-2 text-sm text-gray-500">No new notifications</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <span className="font-semibold text-gray-700">{user?.username}</span>
                                <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                                   <LogOut size={18} /> <span>Logout</span>
                                </button>
                            </>
                        ) : (
                             <div className="space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;