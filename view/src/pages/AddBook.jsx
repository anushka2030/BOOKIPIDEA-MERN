import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [bookData, setBookData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    description: '',
    language: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      };

      const response = await axios.post(
        'http://localhost:1000/api/v1/add-book',
        bookData,
        { headers }
      );

      setSuccess(response.data.message);
      setBookData({
        url: '',
        title: '',
        author: '',
        price: '',
        description: '',
        language: ''
      });

      // Optionally navigate to books list after successful addition
      setTimeout(() => {
        navigate('/admin/books');
      }, 2000);

    } catch (error) {
      setError(error.response?.data || 'Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-zinc-900 min-h-screen p-4 text-white'>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block mb-2">Book Cover URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={bookData.url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="author" className="block mb-2">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              required
              disabled={isSubmitting}
            />
          </div>
            <div className = "flex gap-8">
            <div className = "w-1/2">
            <label htmlFor="price" className="block mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              required
              disabled={isSubmitting}
              min="0"
              step="0.01"
            />
          </div>

          <div className = "w-1/2">
            <label htmlFor="language" className="block mb-2">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              value={bookData.language}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              required
              disabled={isSubmitting}
            />
          </div>
            </div>

          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={bookData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-yellow-500"
              required
              disabled={isSubmitting}
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-yellow-500 text-zinc-900 font-semibold py-2 rounded hover:bg-yellow-400 transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding Book...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;