import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

//Adding Book can only be done by Admin
const AddBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const { AddBooksSubmit, loading, error } = useContext(BookContext);
    const nav = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        AddBooksSubmit({ title, author, description });
        nav('/books')
    };

    if (loading) return <div className="text-blue-500">Submitting book details...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full hover:scale-105 overflow-hidden transform transition duration-300"
            >
                <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add New Book</h3>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Book Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter book title"
                        required
                        className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author Name
                    </label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author name"
                        required
                        className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Book Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter book description"
                        required
                        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBooks;
