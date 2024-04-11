import Layout from './pages/Layout';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="h-full w-full dark:bg-gray-300">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books" element={<Books />} />
            </Routes>
          </Layout>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
