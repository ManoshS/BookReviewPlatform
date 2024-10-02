import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { username, getUserReview, userReview } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    getUserReview(1);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">User Profile</h1>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Username: {username?.username}</h2>
        <p className="text-gray-600 mb-2"><strong>Role:</strong> {username?.role}</p>
      </div>
      {username?.role === 'admin' ? <button
        type="submit"
        className="w-32 bg-blue-500 text-white font-semibold py-2 hover:scale-105 rounded-lg hover:bg-blue-600 transition duration-200"
      ><Link to='/addBooks'>
        Add Books</Link>
      </button> : null}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">My Reviews</h2>
        {userReview.length === 0 ? (
          <p className="text-gray-500">You have not submitted any reviews yet.</p>
        ) : (
          userReview.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-50 transition duration-200 hover:scale-105 " >
              <h4 className="text-lg font-semibold text-gray-800">{review.comment}</h4>
              <p className="text-gray-600">Book ID: {review.book_id}</p>
              <p className="text-yellow-500">Rating: {review.rating}/5</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
