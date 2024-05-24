import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';


const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const { code, error } = queryString.parse(location.search);

    if (error) {
      console.error('OAuth error:', error);
    } else {
      // console.log('Authorization code:', code);

      const fetchAccessToken = async () => {
        try {
          const tokenResponse = await fetch('https://auth.atlassian.com/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: process.env.REACT_APP_CLIENT_ID,
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
              code: code,
              redirect_uri: 'http://localhost:3000/oauth-callback',
            }),
          });

          if (!tokenResponse.ok) {
            throw new Error('Failed to fetch access token');
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
       
          localStorage.setItem('accessToken', accessToken);

          const resourcesResponse = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
            },
          });

          if (!resourcesResponse.ok) {
            throw new Error('Failed to fetch accessible resources');
          }

          const resourcesData = await resourcesResponse.json();
          console.log('Accessible resources:', resourcesData);

          const resources = resourcesData.map(resource => ({
            id: resource.id,
            url: resource.url,
            name: resource.name,
          }));

          console.log('Formatted resources:', resources);

        
          const name = resourcesData[0].name;
          const resource_id = resourcesData[0].id; 
          localStorage.setItem('name', name);
          localStorage.setItem('resource_id', resource_id);

          const confluenceContent = await Promise.all(resources.map(async (resource) => {
            const contentResponse = await fetch(`https://api.atlassian.com/ex/confluence/${resource.id}/rest/api/content`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
              },
            });

            if (!contentResponse.ok) {
              throw new Error('Failed to fetch Confluence content');
            }

            const contentData = await contentResponse.json();
            return { resourceId: resource.id, content: contentData };
          }));

          // console.log('Confluence content:', confluenceContent);

          await fetch('http://localhost:3001/store-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken, resources, posts: confluenceContent }),
          });


          navigate('/view-files');

        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchAccessToken();
    }
  }, [location.search, navigate]); 

  return (
    <div>
      <p>Processing authentication...</p>
    </div>
  );
};

export default OAuthCallback;
