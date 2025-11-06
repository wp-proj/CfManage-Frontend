import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SearchBar from "./components/common/SearchBar";
import UserProfile from "./components/UserProfile/UserProfile";
import Navbar from "./components/Layout/Navbar";
import ComparePage from "./page/ComparePage";
import Teams from './page/Teams';
import TeamLeaderboardPage from "./page/TeamLeaderboardPage";

function Home({ onSearch }) {
  return (
    <>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-16 pb-12 text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Codeforces Profile Viewer
              </h1>
              <p className="text-gray-400 text-lg mx-auto leading-relaxed">
                Analyze ratings, problem-solving stats, and tag distributions between any user.
              </p>
              <div className='h-5'></div>
            </section>

            {/* Center + Wider */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                {" "}
                {/* you can change 2xl → 3xl for even wider */}
                <SearchBar onSearch={onSearch} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchUsername) => {
    setUsername(searchUsername);
    navigate(`/user/${searchUsername}`);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home onSearch={handleSearch} />} />
            <Route
              path="/user/:username"
              element={
                <Layout>
                  <UserProfile />
                </Layout>
              }
            />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:teamid" element={<TeamLeaderboardPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function RootApp() {
  return (
    <>
      <Router>
        <App />
      </Router>
    </>
  );
}
