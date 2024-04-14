import Layout from './pages/Layout';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Subjects from './pages/Subjects';
import Agents from './pages/Agents';
import Bookshelves from './pages/Bookshelves';
import Page404 from './pages/sub_pages/Page404';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ConfirmEmail from './pages/sub_pages/ConfirmEmail';
import ChangePassword from './pages/sub_pages/ChangePassword';
import ForgotPassword from './pages/sub_pages/ForgotPassword';
import Book from './pages/Book';
import Agent from './pages/Agent';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="h-full w-full ">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <ProtectedRoute component={Profile} />
              } />
              <Route path="/confirm-email" element={<ConfirmEmail />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/books" element={<Books />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<Agent />} />
              <Route path="/bookshelves" element={<Bookshelves />} />
              <Route path="/books/:id" element={<Book />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Layout>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
