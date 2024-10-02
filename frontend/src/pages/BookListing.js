import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';


const BookListing = () => {
  const { books, loading, error, fetchBooksInOrder } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('All');


  useEffect(() => {
    fetchBooksInOrder(filterGenre);
  }, [filterGenre]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"> </div>
  </div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8">Book Listing</h1>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterGenre}
          onChange={(e) => { setFilterGenre(e.target.value); }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Books</option>
          <option value="AscendingTime">Sort by time (Ascending)</option>
          <option value="DescendingTime">Sort by time (Descending)</option>
          <option value="MoreRating">Sort by Rating (More)</option>
          <option value="LessRating">Sort by Rating (Less)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks?.map((book, index) => (
          <Link to={`/book/${book.id}`} key={book.id} className="group">
            <div
              className={`bg-neutral-100 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 animate-slide-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h1 className="w-full h-20 object-cover text-4xl text-center text-sky-950 group-hover:text-blue-800">
                {book.title}
              </h1>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition duration-300">
                  ID: {book.id}
                </h3>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition duration-300">
                  Book Title: {book.title}
                </h3>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Description: {book.description}
                </p>
                {book.rating && <p className="text-sm text-yellow-800 mt-2">
                  Rating: {book.rating}/5
                </p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookListing;