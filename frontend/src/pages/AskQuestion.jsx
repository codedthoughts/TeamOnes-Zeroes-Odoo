import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import RichTextEditor from '../components/RichTextEditor';

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        if (tagsArray.length === 0) {
            setError('Please provide at least one tag.');
            return;
        }

        try {
            const res = await api.post('/questions', { title, content, tags: tagsArray });
            navigate(`/questions/${res.data._id}`);
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Failed to post question');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Ask a Public Question</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}
                <div>
                    <label className="block font-semibold mb-2">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-md" placeholder="e.g., How do I center a div?" required />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Body</label>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Tags</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 border rounded-md" placeholder="e.g., react, javascript, css (comma-separated)" required />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Post Your Question</button>
            </form>
        </div>
    );
};

export default AskQuestion;