import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function AiTherapy() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm Hermione, your AI therapeutic companion. I'm here to listen and support you. How are you feeling today?"
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // Auto scroll effect
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/login');
                    return;
                }

                // First fetch current user
                const userResponse = await axios.get('http://localhost:8000/api/v1/users/current-user', {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (userResponse.data?.data) {
                    setCurrentUser(userResponse.data.data);

                }

                // Then fetch posts
                const postsResponse = await axios.get('http://localhost:8000/api/v1/community', {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (postsResponse.data?.data) {
                    setPosts(postsResponse.data.data);
                }

            } catch (err) {
                console.error('Auth check error:', err);
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError('Failed to load content');
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndLoadData();
    }, [navigate]);
    // Load chat history on component mount
    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/aitherapy/history', {
                    withCredentials: true
                });
                if (response.data.data.length > 0) {
                    setMessages(response.data.data);
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };
        loadChatHistory();
    }, []);


    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || loading) return;

        const userMessage = { role: 'user', content: newMessage };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setLoading(true);

        try {
            // Save user message to backend
            await axios.post('http://localhost:8000/api/v1/aitherapy/message', userMessage, {
                withCredentials: true
            });

            // Updated prompt for more natural conversation
            const result = await model.generateContent(`
                You are Hermione, a compassionate AI therapeutic companion. You're speaking with ${currentUser?.username}. 
                Important guidelines:
                - Respond in a warm, empathetic manner while maintaining professional therapeutic boundaries
                - Never start messages with "Hi ${currentUser?.username}" or similar greetings
                - Use the user's name very sparingly and only when it feels natural in conversation
                - Occasionally use emojis to add warmth (1-2 per message maximum)
                - Make responses feel like a natural flowing conversation
                - Focus on continuing the conversation thread rather than starting fresh each time
                - Show you're actively listening by referencing previous messages when relevant
                
                Previous context: ${messages.slice(-3).map(m => m.content).join('\n')}
                User's message: ${newMessage}
            `);
            const aiResponse = {
                role: 'assistant',
                content: result.response.text()
            };

            // Save AI response to backend
            await axios.post('http://localhost:8000/api/v1/aitherapy/message', aiResponse, {
                withCredentials: true
            });

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error in chat:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I apologize, but I encountered an error. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <nav className='shadow-md bg-white sticky top-0 z-10'>
                <h1 className="text-xl sm:text-2xl p-3 mx-4 sm:mx-6 font-heading font-bold text-primary-500">
                    AITherapy
                </h1>
            </nav>

            {/* Main Chat Container */}
            <div className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl flex flex-col">
                <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col max-h-[85vh]">
                    {/* Chat Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-3 sm:p-6 scroll-smooth"
                    >
                        <div className="space-y-3 sm:space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-lg ${message.role === 'user'
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                            } text-sm sm:text-base font-body`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
                        <form onSubmit={handleSendMessage} className="flex space-x-2 sm:space-x-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !newMessage.trim()}
                                className={`px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors text-sm sm:text-base
                                    ${(loading || !newMessage.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiTherapy;