
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const Home = () => {
  const { featuredBooks, fetchFeaturedBooks, loading, error } = useContext(BookContext);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Bookstore</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredBooks.map((book, index) => (
          <Link to={`/book/${book.id}`} key={book.id} className="group">
            <div className={`bg-neutral-100 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 `} style={{ animationDelay: `${index * 100}ms` }}>
              <h1 className="w-full h-20 object-cover text-4xl text-center text-sky-950 group-hover:text-blue-800" >{book.title}</h1>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition duration-300">id : {book.id}</h3>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition duration-300">Book Title : {book.title}</h3>
                <p className="text-gray-600">Auther : {book.author}</p>
                <p className="text-sm text-gray-500 mt-2">Description : {book.description}</p>
                <p className="text-sm text-yellow-700 mt-2">Rating : {book.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;