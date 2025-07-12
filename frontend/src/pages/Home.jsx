import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get('/questions');
                setQuestions(res.data.questions);
            } catch (err) {
                setError('Failed to fetch questions.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">All Questions</h1>
                <Link to="/ask" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Ask Question</Link>
            </div>
            <div className="bg-white rounded-lg shadow-md">
                {questions.length > 0 ? (
                    questions.map((q) => (
                        <div key={q._id} className="p-6 border-b last:border-b-0">
                            <Link to={`/questions/${q._id}`} className="text-xl font-semibold text-blue-700 hover:underline">{q.title}</Link>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {q.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>)}
                            </div>
                            <p className="text-sm text-gray-500 mt-3">Asked by {q.author.username} on {new Date(q.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="p-6 text-center text-gray-500">No questions have been asked yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default Home;