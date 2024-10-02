import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddBooks from './components/AddBooks';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';
import ReviewForm from './components/ReviewForm';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import BookDetails from './pages/BookDetails';
import BookListing from './pages/BookListing';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
const App = () => {
  return (
    <BookProvider>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/books" element={<BookListing />} />
                  <Route path="/book/:id" element={<BookDetails />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/review" element={<ReviewForm />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/addBooks" element={<AddBooks />} />
                </Routes>
              </main>
              <footer className="bg-gray-800 text-white text-center py-4">
                © 2024 Your Bookstore. All rights reserved.
              </footer>
            </div>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </BookProvider>

  );
};

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { BookProvider } from './context/BookContext';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import BookListing from './pages/BookListing';
// import BookDetails from './pages/BookDetails';
// import UserProfile from './pages/UserProfile';
// import ReviewForm from './components/ReviewForm';
// import Login from './components/Login';
// import Register from './components/Register';
// import ErrorBoundary from './components/ErrorBoundary';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <BookProvider>
//         <Router>
//           <ErrorBoundary>
//             <div className="flex flex-col min-h-screen">
//               <Navbar />
//               <main className="flex-grow">
//                 <Switch>
//                   <Route exact path="/" component={Home} />
//                   <Route path="/books" component={BookListing} />
//                   <Route path="/book/:id" component={BookDetails} />
//                   <PrivateRoute path="/profile" component={UserProfile} />
//                   <PrivateRoute path="/review" component={ReviewForm} />
//                   <Route path="/login" component={Login} />
//                   <Route path="/register" component={Register} />
//                 </Switch>
//               </main>
//               <footer className="bg-gray-800 text-white text-center py-4">
//                 © 2024 Your Bookstore. All rights reserved.
//               </footer>
//             </div>
//           </ErrorBoundary>
//         </Router>
//       </BookProvider>
//     </AuthProvider>
//   );
// };

// export default App;