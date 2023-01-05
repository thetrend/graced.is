import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { PostOrPage, Posts } from './components/Blog';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <>
      <div className="header">
        <h1>
          <Link className="headerLink" to='/'>grace d. is</Link>
        </h1>
        <span><Link to='/page/about'>About</Link></span>
      </div>
      <div className="contentBox">
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/post/:slug' element={<PostOrPage />} />
          <Route path='/page/:slug' element={<PostOrPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;