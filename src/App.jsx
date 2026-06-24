import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BidList from './components/BidList';
import BidDetail from './components/BidDetail';
import PODPage from './components/PODPage';
import VendorPage from './components/VendorPage';
import UserPage from './components/UserPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import ContactPage from './components/ContactPage';
import LogoutPage from './components/LogoutPage';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BidList />} />
            <Route path="/bid/:id" element={<BidDetail />} />
            <Route path="/pod" element={<PODPage />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
