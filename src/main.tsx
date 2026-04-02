import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import About from './pages/About.tsx';
import Login from './pages/Login.tsx';
import Services from './pages/Services.tsx';
import AdminInsight from './pages/AdminInsight.tsx';
import InsightsList from './pages/InsightsList.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import InsightEditor from './pages/InsightEditor.tsx';
import InsightView from './pages/InsightView.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/insights" element={<InsightsList />} />
        <Route path="/insights/new" element={<InsightEditor />} />
        <Route path="/insights/edit/:id" element={<InsightEditor />} />
        <Route path="/insights/:id" element={<InsightView />} />
        <Route path="/insight" element={<AdminInsight />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  </StrictMode>
);
