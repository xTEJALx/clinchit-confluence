import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; 

const Page = () => {
  const { id } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const resource_id = localStorage.getItem('resource_id');
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.atlassian.com/ex/confluence/${resource_id}/rest/api/content/${id}?expand=body.view`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.body.view.value, 'text/html');


        doc.querySelectorAll('img').forEach(img => {
          const wrapper = doc.createElement('div');
          wrapper.classList.add('flex', 'justify-center');
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);

          img.classList.add('w-32', 'h-auto');
        });

        const updatedContent = doc.documentElement.innerHTML;

        await fetch('http://localhost:3001/store-page-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pageId: id,
            content: data
          })
        });

        setContent(updatedContent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, resource_id, accessToken]);

  return (
    <div className="p-4">
      {content && (
        <div className="p-4 border border-gray-300 rounded-md bg-gray-100">
          <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
