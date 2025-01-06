import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Configure axios to include auth token

const moodOptions = [
    { value: 'Happy', emoji: '😊', color: 'bg-yellow-400 hover:bg-yellow-500' },
    { value: 'Peaceful', emoji: '😌', color: 'bg-blue-400 hover:bg-blue-500' },
    { value: 'Neutral', emoji: '😐', color: 'bg-gray-400 hover:bg-gray-500' },
    { value: 'Sad', emoji: '😢', color: 'bg-indigo-400 hover:bg-indigo-500' },
    { value: 'Angry', emoji: '😠', color: 'bg-red-400 hover:bg-red-500' },
    { value: 'Anxious', emoji: '😰', color: 'bg-purple-400 hover:bg-purple-500' },
    { value: 'Tired', emoji: '😴', color: 'bg-green-400 hover:bg-green-500' },
    { value: 'Confused', emoji: '😕', color: 'bg-orange-400 hover:bg-orange-500' }
];

function Mood() {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);
    const [journal, setJournal] = useState('');
    const [gratitude, setGratitude] = useState('');
    const [goals, setGoals] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);

    // Fetch mood history on component mount
    useEffect(() => {
        fetchMoodHistory();
    }, []);

    const fetchMoodHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/mood/history', {
                withCredentials: true
            });
            setMoodHistory(response.data.data);
        } catch (error) {
            console.error('Error fetching mood history:', error);
            // Add error handling
            if (error.response?.status === 401) {
                // Handle unauthorized access - maybe redirect to login
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedMood) {
            setError('Please select a mood');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:8000/api/v1/mood', {
                mood: selectedMood,
                journal,
                gratitude,
                goals
            }, {
                withCredentials: true
            });

            // Reset form
            setSelectedMood(null);
            setJournal('');
            setGratitude('');
            setGoals('');

            // Refresh mood history
            fetchMoodHistory();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save mood entry');
            console.error('Error saving mood:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/v1/mood/${id}`, {
            withCredentials: true
        });
        fetchMoodHistory();
    };
    return (
        <div className="min-h-screen bg-background">
            <nav className='shadow-md bg-white'>
                <h1 className="text-2xl p-3  mx-6 font-heading font-bold text-primary-500 mb-8">
                    Mood Tracker
                </h1></nav>
            <div className="container mx-auto px-4 py-8">
                {/* <h1 className="text-4xl font-heading font-bold text-primary-500 mb-8">
                    Mood Tracker
                </h1> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mood Entry Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold  font-heading text-primary-500 mb-4">How are you feeling?</h2>

                        <form onSubmit={handleSubmit} className="space-y-6 font-body text-text-700">
                            {/* Mood Selection */}
                            <div className="grid grid-cols-4 gap-4">
                                {moodOptions.map((mood) => (
                                    <button
                                        key={mood.value}
                                        type="button"
                                        onClick={() => setSelectedMood(mood.value)}
                                        className={`p-4 rounded-lg text-center transition-colors ${selectedMood === mood.value
                                            ? `${mood.color} text-white`
                                            : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{mood.emoji}</div>
                                        <div className="text-sm font-body">{mood.value}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Journal Entry */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Journal</label>
                                <textarea
                                    value={journal}
                                    onChange={(e) => setJournal(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="How are you feeling today?"
                                />
                            </div>

                            {/* Gratitude */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Gratitude</label>
                                <textarea
                                    value={gratitude}
                                    onChange={(e) => setGratitude(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    rows="2"
                                    placeholder="What are you grateful for?"
                                />
                            </div>

                            {/* Goals */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Goals</label>
                                <textarea
                                    value={goals}
                                    onChange={(e) => setGoals(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    rows="2"
                                    placeholder="What are your goals for today?"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !selectedMood}
                                className={`w-full py-3 font-body rounded-lg font-semibold transition-colors
                                    ${loading || !selectedMood
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-primary-500 text-white hover:bg-primary-600'}`}
                            >
                                {loading ? 'Saving...' : 'Save Entry'}
                            </button>

                            {error && (
                                <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Mood History */}
                    <div className="bg-white p-6 rounded-lg shadow-md font-body text-text-700">
                        <h2 className="text-xl font-semibold mb-4 font-heading text-primary-500">Mood History</h2>
                        <div className="space-y-4">
                            {moodHistory.length > 0 ? (
                                moodHistory.map((entry) => (
                                    <div
                                        key={entry._id}
                                        className={`border-b pb-4 rounded-lg p-3 font-body text-800 ${moodOptions.find(m => m.value === entry.mood)?.color}  r`}
                                    // style={{ backgroundColor: moodOptions.find(m => m.color)?.color || 'transparent' }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">

                                                <span className="text-2xl mr-2">
                                                    {moodOptions.find(m => m.value === entry.mood)?.emoji}
                                                </span>
                                                <span className="font-medium text-primary-700">{entry.mood}</span>

                                            </div>
                                            <span className="text-sm text-gray-500 text-primary-700 flex items-center">
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                                <span onClick={() => handleDelete(entry._id)} className="text-xl ml-2 cursor-pointer">X</span>
                                            </span>
                                        </div>
                                        {entry.journal && (
                                            <p className="text-sm text-primary-800 mb-2">{entry.journal}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No mood entries yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mood; 