import React from 'react';
import confluenceLogo from './iconfluence-48.png';


let oauthURL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${process.env.REACT_APP_SCOPES}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth-callback&state=123&response_type=code&prompt=consent`;

const Confluence = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-black w-64 h-64 flex items-center justify-center rounded-lg "style={{ border: "5px dashed grey" }}>
        <div className="py-2 px-4 rounded">
          <a href={oauthURL}>
            <button className="flex items-center text-white py-2 px-4 rounded">
              <img src={confluenceLogo} alt="Logo" className="w-6 h-6 mr-2 bg-black" />
              <p>Confluence<br/><span class="text-orange-500 text-xs">Connect</span></p>
              
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Confluence;
