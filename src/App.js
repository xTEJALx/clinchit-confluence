import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Confluence from './Components/Confluence';
import Files from './Components/Files';
import OAuthCallback from './Components/OAuthCallback';
import Page from './Components/Page';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Confluence />} />
        <Route path="/view-files" element={<Files />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/page/:id" element={<Page />} />
        
      </Routes>
    </Router>
  );
}

export default App;
