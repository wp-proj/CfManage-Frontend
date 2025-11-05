import { useState } from 'react'
import Layout from './components/Layout/Layout'
import SearchBar from './components/common/SearchBar'
import UserProfile from './components/UserProfile/UserProfile'

function App() {
  const [username, setUsername] = useState('');

  const handleSearch = (searchUsername) => {
    setUsername(searchUsername);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Codeforces Profile Viewer
          </h1>
          <p className="text-white/80 text-lg">
            View detailed statistics and insights of any Codeforces user
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} />
        
        {username && <UserProfile username={username} />}
      </div>
    </Layout>
  )
}

export default App
