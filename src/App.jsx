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

function Home({ onSearch }) {
  return (
    <>
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

          {/* Center + Wider */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              {" "}
              {/* you can change 2xl → 3xl for even wider */}
              <SearchBar onSearch={onSearch} />
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
