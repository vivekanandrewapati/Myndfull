import React, { useState, useEffect } from 'react';
import { FiHeart, FiMessageCircle, FiUser, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Community() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    console.log("Current user fetched:", userResponse.data.data);
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

    // Define fetchPosts function at component level
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/community', {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPosts(response.data.data);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts');
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.log('No current user');
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('accessToken');
            console.log('Using token for post:', token);

            const response = await axios.post('http://localhost:8000/api/v1/community', {
                content: newPost,
                isAnonymous
            }, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Post created:', response.data);
            setPosts(prev => [response.data.data, ...prev]);
            setNewPost('');
            setIsAnonymous(false);
        } catch (err) {
            console.error('Create post error:', err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setError('Failed to create post');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('Please log in to like posts');
                navigate('/login');
                return;
            }

            const response = await axios.post(`http://localhost:8000/api/v1/community/${postId}/like`, {}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update posts state with the updated post
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId ? response.data.data : post
                )
            );

        } catch (err) {
            console.error('Like post error:', err);
            if (err.response?.status === 401) {
                localStorage.clear(); // Clear invalid token
                navigate('/login');
            } else {
                setError('Failed to like post');
            }
        }
    };

    const handleAddComment = async (postId) => {
        if (!currentUser) {
            setError('Please log in to comment');
            return;
        }

        if (!comment.trim()) return;

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/community/${postId}/comments`, {
                content: comment
            }, {
                withCredentials: true
            });
            setPosts(prev => prev.map(post =>
                post._id === postId
                    ? { ...post, comments: [...post.comments, response.data.data] }
                    : post
            ));
            setComment('');
            setSelectedPost(null);
        } catch (err) {
            console.error('Add comment error:', err);
            if (err.response?.status === 401) {
                setError('Please log in to comment');
            } else {
                setError('Failed to add comment');
            }
        }
    };

    const handleDeletePost = async (postId) => {
        if (!currentUser) {
            setError('Please log in to delete posts');
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/v1/community/${postId}`, {
                withCredentials: true
            });
            setPosts(prev => prev.filter(post => post._id !== postId));
        } catch (err) {
            console.error('Delete post error:', err);
            if (err.response?.status === 401) {
                setError('Please log in to delete posts');
            } else {
                setError('Failed to delete post');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <nav className="bg-white py-2 shadow-md">
                <div className="container mx-8  max-w-4xl">
                    <h1 className="text-2xl  font-heading font-bold text-primary-500 mb-8">
                        Community
                    </h1>
                </div>
            </nav>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* <h1 className="text-4xl font-heading font-bold text-primary-500 mb-8">
                    Community
                </h1> */}

                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {currentUser && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <form onSubmit={handleCreatePost}>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Share your thoughts..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                rows="3"
                            />
                            <div className="flex items-center  font-body justify-between mt-4">
                                <label className="flex items-center space-x-2 text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={isAnonymous}
                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                        className="rounded text-primary-500 focus:ring-primary-500"
                                    />
                                    <span>Post anonymously</span>
                                </label>
                                <button
                                    type="submit"
                                    disabled={!newPost.trim() || loading}
                                    className={`px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors
                                        ${(!newPost.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Posts List */}
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md font-body">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    {post.isAnonymous ? (
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                                <FiUser className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <span className="text-gray-600">Anonymous</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <img
                                                src={post.author?.avatar || '/default-avatar.png'}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <span className="font-medium">{post.author?.fullName || 'Unknown User'}</span>
                                        </div>
                                    )}
                                </div>
                                {currentUser && post.author && currentUser._id === post.author._id && (
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <FiTrash2 />
                                    </button>
                                )}
                            </div>

                            <p className="text-gray-800 mb-4">{post.content}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handleLikePost(post._id)}
                                        className="flex items-center space-x-1 text-gray-600 hover:text-primary-500"
                                    >
                                        <FiHeart
                                            className={
                                                currentUser && post.likes.includes(currentUser._id)
                                                    ? 'fill-current text-primary-500'
                                                    : ''
                                            }
                                        />
                                        <span>{post.likes.length}</span>
                                    </button>
                                    <button
                                        onClick={() => setSelectedPost(post._id === selectedPost?._id ? null : post)}
                                        className="flex items-center space-x-1 text-gray-600 hover:text-primary-500"
                                    >
                                        <FiMessageCircle />
                                        <span>{post.comments.length}</span>
                                    </button>
                                </div>
                            </div>

                            {currentUser && selectedPost?._id === post._id && (
                                <div className="mt-4 pt-4 border-t">
                                    <div className="space-y-4 mb-4">
                                        {post.comments.map((comment, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <img
                                                    src={comment.author?.avatar || '/default-avatar.png'}
                                                    alt="Avatar"
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <div>
                                                    <span className="font-medium text-sm">
                                                        {comment.author?.fullName || 'Unknown User'}
                                                    </span>
                                                    <p className="text-gray-600">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        <button
                                            onClick={() => handleAddComment(post._id)}
                                            disabled={!comment.trim()}
                                            className={`px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors
                                                ${!comment.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Community;
