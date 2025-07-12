import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
    const token = useAuthStore((state) => state.token);
    
    if (!token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This is a good UX practice.
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;