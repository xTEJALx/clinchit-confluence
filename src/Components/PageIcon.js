import React from 'react';
import { Link } from 'react-router-dom';

const PageIcon = ({ title, id }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-md shadow-md border border-gray-300 m-14" style={{ width: '600px' }}>
      <Link
        to={`/page/${id}`}
        state={{ id }}
        className="block text-xl font-semibold text-gray-800 hover:text-gray-900 transition duration-300"
      >
        {title}
      </Link>
    </div>
  );
}

export default PageIcon;
