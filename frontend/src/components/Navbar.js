import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//Navbar 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { signin, username } = useContext(AuthContext)
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Profile', path: '/profile' },

  ];


  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-20 w-20" src="/logo.png" alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(item.path)
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-50 hover:bg-blue-700 hover:text-white'
                      } transition duration-150 ease-in-out`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">

            <div className="ml-4 flex items-center md:ml-6">

              <button className="bg-blue-800 p-1 rounded-full text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              {signin ?
                <Link to="/logout" className={`px-3 py-2 rounded-md text-right text-sm font-medium ${isActive('/logout')
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-50 hover:bg-blue-700 hover:text-white'
                  } transition duration-150 ease-in-out`}>
                  Logout
                </Link> :
                <Link to="/login" className={`px-3 py-2 rounded-md text-right text-sm font-medium ${isActive('/login')
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-50 hover:bg-blue-700 hover:text-white'
                  } transition duration-150 ease-in-out`}>
                  Login
                </Link>}
                <Link to="/profile">{username ? <h2 className='"bg-blue-800 p-1 rounded-full text-blue-200 hover:text-white bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white'>{username.username} </h2> : <h2 className='text-white justify-center'>No User</h2>}

                </Link>
            </div>

          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>

          </div>

        </div>

      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-50 hover:bg-blue-700 hover:text-white'
                  } transition duration-150 ease-in-out`}
              >
                {item.name}
              </Link>

            ))}
            {signin ?
              <Link to="/logout" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/logout')
                ? 'bg-blue-800 text-white'
                : 'text-blue-50 hover:bg-blue-700 hover:text-white'
                } transition duration-150 ease-in-out`}>
                Logout
              </Link> :
              <Link to="/login" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/login')
                ? 'bg-blue-800 text-white'
                : 'text-blue-50 hover:bg-blue-700 hover:text-white'
                } transition duration-150 ease-in-out`}>
                Login
              </Link>}
            {username ? <h2 className=' block px-3 py-2 rounded-md text-basebg-blue-800 p-1  text-blue-200 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white'>{username.username} </h2> : <h2 className='text-white justify-center'>No User</h2>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;