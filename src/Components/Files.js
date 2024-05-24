import React, { useState } from 'react';
import axios from 'axios';
import PageIcon from './PageIcon';

const Files = () => {
  const [data, setData] = useState(null);
  const name = localStorage.getItem('name');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-data/${name}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching the data', error);
    }
  };

  if (name) {
    fetchData();
  }

  let postsData = data?.posts[0]?.content?.results || [];

  return (
    <div>
    <div className="flex items-center justify-center text-xl font-bold p-2">Hello, {data && data.name}</div>
    <div className="flex justify-between">
      


      {data ? (
        <div className="flex">
          <div className="w-1/2">
            {postsData.length > 0 ? (
              postsData.slice(0, Math.ceil(postsData.length / 2)).map(post => (
                <PageIcon key={post.id} title={post.title} id={post.id} />
              ))
            ) : (
              // <p>No posts available.</p>
              <div></div>
            )}
          </div>
          <div className="w-1/2">
            {postsData.length > 0 ? (
              postsData.slice(Math.ceil(postsData.length / 2)).map(post => (
                <PageIcon key={post.id} title={post.title} id={post.id} />
              ))
            ) : (
              // <p>No posts available.</p>
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>

    </div>
  );
};

export default Files;
