import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DispatcherDashboard from './components/DispatcherDashboard';
import ServiceSelection from './components/ServiceSelection';
import ServicesPage from './components/ServicesPage';
import MovingBooking from './components/MovingBooking';
import TowingRequest from './components/TowingRequest';
import FleetManagement from './components/FleetManagement';
import ExportModal from './components/ExportModal';
import LoginModal from './components/LoginModal';
import AdminLogin from './components/AdminLogin';
import DriverPortal from './components/DriverPortal';
import Footer from './components/Footer';
import LegalPages from './components/LegalPages';
import { ShieldAlert } from 'lucide-react';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export default function App() {
  const isAdminPath = window.location.pathname.toLowerCase().startsWith('/admin');
  const isPublicWebsiteView = !isAdminPath && new URLSearchParams(window.location.search).get('view') === 'website';
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dispatch' | 'moving' | 'towing' | 'fleet' | 'prd'
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginInitialTab, setLoginInitialTab] = useState('customer');
  const [loginInitialMode, setLoginInitialMode] = useState('sign-in');
  const [currentUser, setCurrentUser] = useState(null);
  const [emergencyAlert, setEmergencyAlert] = useState(false);

  useEffect(() => {
    if (isPublicWebsiteView) {
      setCurrentUser(null);
      setCurrentView('landing');
      return undefined;
    }
    const token = localStorage.getItem('movevanpro_auth_token');
    if (!token) return undefined;
    let cancelled = false;

    fetch(`${apiBaseUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.error || 'Session expired');
        if (!cancelled) {
          setCurrentUser(payload.user);
          if (payload.user.role === 'dispatcher') {
            if (!isAdminPath) {
              window.location.replace('/admin');
              return;
            }
            setCurrentView('dispatch');
          }
          if (payload.user.role === 'driver') setCurrentView('driver');
        }
      })
      .catch(() => {
        localStorage.removeItem('movevanpro_auth_token');
        if (!cancelled) setCurrentUser(null);
      });

    return () => { cancelled = true; };
  }, [isAdminPath, isPublicWebsiteView]);

  // Global scroll animation observer — watches all [data-scroll] elements across every page
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('scroll-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observe = () => {
      document.querySelectorAll('[data-scroll]:not(.scroll-visible)').forEach((el) => io.observe(el));
    };

    observe();

    // Re-observe when DOM changes (page navigation renders new elements)
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, [currentView]);

  useEffect(() => {
    let frame = 0;
    const updateScrollDepth = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', String(Math.min(1, window.scrollY / maxScroll)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollDepth);
    };
    updateScrollDepth();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [currentView]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowLoginModal(false);
    if (user.role === 'dispatcher') {
      window.location.assign('/admin');
    } else if (user.role === 'driver') {
      setCurrentView('driver');
    }
  };

  const openLogin = (initialTab = 'customer') => {
    setLoginInitialTab(initialTab);
    setLoginInitialMode('sign-in');
    setShowLoginModal(true);
  };

  const closeLogin = () => {
    setShowLoginModal(false);
    setLoginInitialTab('customer');
    setLoginInitialMode('sign-in');
  };

  const handleLogout = () => {
    localStorage.removeItem('movevanpro_auth_token');
    setCurrentUser(null);
    closeLogin();
    if (!isAdminPath) setCurrentView('landing');
  };

  if (isAdminPath && currentUser?.role !== 'dispatcher') {
    return (
      <AdminLogin
        standalone
        onClose={() => window.location.assign('/')}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentView('dispatch');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased w-full max-w-full overflow-x-hidden">
      {/* Master Unified Responsive Navigation Header */}
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        currentUser={currentUser}
        onOpenLogin={openLogin}
        onChangePassword={() => {
          setLoginInitialTab(currentUser?.role === 'dispatcher' ? 'staff' : 'customer');
          setLoginInitialMode('change-password');
          setShowLoginModal(true);
        }}
      />

      {/* Emergency Global Banner Notification if triggered */}
      {emergencyAlert && (
        <div className="bg-[#ba1a1a] text-white px-4 md:px-6 py-2 text-xs font-bold flex justify-between items-center z-50 shadow-md animate-pulse">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="truncate">Emergency towing workspace opened. A live dispatch alert will appear here once emergency requests are connected to the backend.</span>
          </div>
          <button onClick={() => setEmergencyAlert(false)} className="underline hover:text-gray-200 shrink-0 ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Active Screen View Router */}
      <div className="flex-1">
        {currentView === 'dispatch' && currentUser?.role === 'dispatcher' && (
          <DispatcherDashboard 
            onTriggerEmergency={() => {
              setEmergencyAlert(true);
              setCurrentView('towing');
            }}
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {(currentView === 'dispatch' || currentView === 'fleet') && currentUser?.role !== 'dispatcher' && (
          <ServiceSelection
            onSelectService={(service) => setCurrentView(service === 'moving' ? 'moving' : 'towing')}
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'landing' && (
          <ServiceSelection 
            onSelectService={(service) => setCurrentView(service === 'moving' ? 'moving' : 'towing')}
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage onNavigateTo={(view) => setCurrentView(view)} />
        )}

        {currentView === 'moving' && (
          <MovingBooking 
            onNavigateTo={(view) => setCurrentView(view)}
            bookingForCustomer={currentUser?.role === 'dispatcher'}
          />
        )}

        {currentView === 'driver' && currentUser?.role === 'driver' && (
          <DriverPortal onNavigateTo={(view) => setCurrentView(view)} />
        )}

        {currentView === 'towing' && (
          <TowingRequest 
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'fleet' && currentUser?.role === 'dispatcher' && (
          <FleetManagement 
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {(currentView === 'privacy' || currentView === 'terms') && (
          <LegalPages 
            view={currentView}
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}
      </div>

      {/* Global Footer — visible on all pages */}
      <Footer onNavigateTo={(view) => setCurrentView(view)} />

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}

      {/* Login & Authentication Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={closeLogin}
        onLoginSuccess={handleLoginSuccess} 
        onLogout={handleLogout}
        initialTab={loginInitialTab}
        initialMode={loginInitialMode}
        adminMode={currentUser?.role === 'dispatcher'}
      />
    </div>
  );
}
