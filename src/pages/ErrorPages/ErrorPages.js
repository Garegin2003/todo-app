import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css';

function ErrorPages() {
  return (
    <div className="err">
      <div className="err-num">
        <h1>404</h1>
      </div>
      <div className="error">
        <h1>Sorry, Page Not Found</h1>
        <p>The page you requested could not be found</p>
        <Link to={'/'}>Go Back Home</Link>
      </div>
    </div>
  );
}

export default ErrorPages;
