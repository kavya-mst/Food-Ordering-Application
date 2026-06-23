import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <div className="notfound-container">
        <div className="notfound-code">404</div>
        <h3>Oops! Page Not Found</h3>
        <p>This plate is empty! The page you are looking for has been eaten or doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
