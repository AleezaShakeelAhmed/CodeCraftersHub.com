
// Import React and necessary styles
import React from 'react';

// Define the NotFoundPage component
const NotFoundPage = () => {
  return (
    <div>
        <br /> <br /><br /><br /><br /><br />
      <div className="message-box">
        <h1>404</h1>
        <p>Page not found</p>
        <div className="buttons-con">
          <div className="action-link-wrap">
            <a href="/" className="link-button">Go to Home Page</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
