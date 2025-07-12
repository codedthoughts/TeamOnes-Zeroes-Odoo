import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';

function App() {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <Navbar />
                <main className="container mx-auto p-4 md:p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/questions/:id" element={<QuestionDetail />} />
                        <Route 
                            path="/ask" 
                            element={
                                <ProtectedRoute>
                                    <AskQuestion />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;