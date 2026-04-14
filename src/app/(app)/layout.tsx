"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderHeart, Pill, HeartPulse, UserCircle } from 'lucide-react';
import styles from './layout.module.css';
import { GlobalRightPanel } from '@/components/GlobalRightPanel';
import { useState, useEffect } from 'react';
import { FamilyProvider, useFamily } from '@/lib/FamilyContext';

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const { activeMemberId, members } = useFamily();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [fadeSplash, setFadeSplash] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowSplash(true);
    const timer = setTimeout(() => {
      setFadeSplash(true);
      setTimeout(() => setShowSplash(false), 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mobile-first fixed top and bottom nav
  return (
    <div className={styles.appContainer}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <HeartPulse color="var(--primary)" size={24} />
          <span>MediPal AI</span>
        </div>

        {/* Viewing Context (Future-ready) */}
        {activeMemberId !== 'all' && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>
            Viewing: {members.find(m => m.id === activeMemberId)?.name}
          </div>
        )}

        {/* Option B: Clickable Profile/DP in the top right */}
        <div className={styles.topActions} style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            href="/profile"
            style={{ 
              background: 'transparent', border: '2px solid transparent', 
              padding: 0, borderRadius: '12px', cursor: 'pointer', outline: 'none',
              textDecoration: 'none'
            }}
          >
            <div style={{ 
              width: '42px', height: '42px', 
              background: activeMemberId === 'all' ? 'var(--card-bg)' : 'var(--primary)', 
              color: activeMemberId === 'all' ? 'var(--primary)' : 'white', 
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '1.2rem', fontWeight: 800, border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {activeMemberId === 'all' ? 'All' : members.find(m => m.id === activeMemberId)?.name.substring(0,1).toUpperCase() || '?'}
            </div>
          </Link>
        </div>

      </header>

      <GlobalRightPanel 
        isOpen={isRightPanelOpen} 
        onClose={() => setIsRightPanelOpen(false)} 
      />

      {showSplash && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          backgroundColor: '#2563EB', color: 'white',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: fadeSplash ? 0 : 1, transition: 'opacity 0.3s ease-out'
        }}>
          <div className="animate-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <HeartPulse size={48} color="white" />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>MediPal AI</h1>
          </div>
          <p className="animate-in" style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9, animationDelay: '200ms', margin: 0 }}>
            Your Health, Simplified
          </p>
        </div>
      )}

      <main className={styles.mainContent}>
        {children}
      </main>

      <nav className={styles.bottomNav}>
        <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
          <Home size={24} color={pathname === '/dashboard' ? 'var(--primary)' : 'currentColor'} />
          <span style={{ color: pathname === '/dashboard' ? 'var(--primary)' : 'inherit', fontWeight: pathname === '/dashboard' ? 700 : 500 }}>Home</span>
        </Link>
        <Link href="/health-locker" className={`${styles.navItem} ${pathname === '/health-locker' ? styles.active : ''}`}>
          <FolderHeart size={24} color={pathname === '/health-locker' ? 'var(--primary)' : 'currentColor'} />
          <span style={{ color: pathname === '/health-locker' ? 'var(--primary)' : 'inherit', fontWeight: pathname === '/health-locker' ? 700 : 500 }}>Locker</span>
        </Link>
        <Link href="/medicines" className={`${styles.navItem} ${pathname === '/medicines' ? styles.active : ''}`}>
          <Pill size={24} color={pathname === '/medicines' ? 'var(--primary)' : 'currentColor'} />
          <span style={{ color: pathname === '/medicines' ? 'var(--primary)' : 'inherit', fontWeight: pathname === '/medicines' ? 700 : 500 }}>Medicines</span>
        </Link>
        <Link href="/profile" className={`${styles.navItem} ${pathname === '/profile' ? styles.active : ''}`}>
          <UserCircle size={24} color={pathname === '/profile' ? 'var(--primary)' : 'currentColor'} />
          <span style={{ color: pathname === '/profile' ? 'var(--primary)' : 'inherit', fontWeight: pathname === '/profile' ? 700 : 500 }}>Profile</span>
        </Link>
      </nav>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <FamilyProvider>
      <AppLayoutInner>
        {children}
      </AppLayoutInner>
    </FamilyProvider>
  );
}
