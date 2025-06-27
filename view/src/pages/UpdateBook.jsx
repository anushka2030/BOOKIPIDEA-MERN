import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get book ID from URL parameters
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch existing book details on component mount
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError('Book ID is required');
        setIsLoading(false);
        return;
      }

      try {
        const headers = {
          id: localStorage.getItem('id'),
          authorization: `Bearer ${localStorage.getItem('token')}`
        };

        const response = await axios.get(
          `https://bookipidea-mern.onrender.com/api/v1
/get-book-by-id/${id}`,
          { headers }
        );

        // Pre-fill the form with existing book data
        const book = response.data.data;
        setBookData({
          url: book.url || '',
          title: book.title || '',
          author: book.author || '',
          price: book.price || '',
          description: book.description || '',
          language: book.language || ''
        });

      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch book details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

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

      const response = await axios.put(
        `https://bookipidea-mern.onrender.com/api/v1
/update-book/${id}`,
        bookData,
        { 
          headers: {
            ...headers,
            bookid: id // Include book ID in headers as expected by backend
          }
        }
      );

      setSuccess(response.data.message || 'Book updated successfully');

      // Navigate back to books list after successful update
      setTimeout(() => {
        navigate('/all-books');
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching book details
  if (isLoading) {
    return (
      <div className='bg-zinc-900 min-h-screen p-4 text-white flex items-center justify-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-zinc-900 min-h-screen p-4 text-white'>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Update Book</h1>

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
          
          <div className="flex gap-8">
            <div className="w-1/2">
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

            <div className="w-1/2">
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
            {isSubmitting ? 'Updating Book...' : 'Update Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;