import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div className="not-found-container">
        <img
          src="https://nxtwave-assessments-backend-nxtwave-media-files.s3.ap-south-1.amazonaws.com/topin_beta/media/content_loading/uploads/a34ebd9a-63e7-4590-841e-2c8bfe46d7b_not%20found%20image.webp"
          alt="not-found"
        />
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="back-btn">Go to Dashboard</Link>
      </div>
    </div>
  );
}

export { NotFound };
export default NotFound;
