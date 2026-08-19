'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/projects', label: 'Projects' },
  { href: '/investment', label: 'Investment' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');

  // Minimal navbar for admin pages
  if (isAdmin) {
    return (
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(10, 37, 64, 0.97)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 2px 40px rgba(10,37,64,0.3)',
        padding: '12px 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', background: 'var(--gradient-gold)',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1rem', color: 'var(--primary)',
            }}>HK</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '700', color: 'var(--secondary)' }}>
              Admin Panel
            </span>
          </Link>
          <NavAuthButtons />
        </div>
      </nav>
    );
  }


  return (
    <>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled || !isHome
            ? 'rgba(10, 37, 64, 0.97)'
            : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          boxShadow: scrolled || !isHome ? '0 2px 40px rgba(10,37,64,0.3)' : 'none',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '44px', height: '44px',
              background: 'var(--gradient-gold)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '1.2rem',
              color: 'var(--primary)',
              flexShrink: 0,
            }}>
              HK
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#fff',
                lineHeight: 1,
              }}>
                HK Realty
              </div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--secondary)', textTransform: 'uppercase', marginTop: '2px' }}>
                Building Trust. Creating Landmarks.
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  color: pathname === link.href ? 'var(--secondary)' : 'rgba(255,255,255,0.85)',
                  fontSize: '0.9rem',
                  fontWeight: pathname === link.href ? '600' : '400',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  position: 'relative',
                  textDecoration: 'none',
                }}
                className="nav-link"
              >
                {link.label}
                {pathname === link.href && (
                  <span style={{
                    position: 'absolute', bottom: '2px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px', height: '4px',
                    background: 'var(--secondary)',
                    borderRadius: '50%',
                  }} />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hide-mobile" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <NavAuthButtons />
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get Consultation
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
            className="hamburger"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#fff',
                borderRadius: '2px',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'opacity: 0'
                  : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(10, 37, 64, 0.98)',
            padding: '20px 24px 32px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeInUp 0.3s ease',
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  color: pathname === link.href ? 'var(--secondary)' : 'rgba(255,255,255,0.85)',
                  fontSize: '1rem',
                  fontWeight: pathname === link.href ? '600' : '400',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <NavAuthButtonsMobile onClose={() => setMenuOpen(false)} />
              <Link href="/contact" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
        .nav-link:hover {
          color: var(--secondary) !important;
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>
    </>
  );
}

// Desktop auth buttons
function NavAuthButtons() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    let unsubscribe: () => void;
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      import('@/lib/firebase').then(({ auth }) => {
        unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u);
          if (u?.email) {
            import('@/lib/auth').then(({ isUserAdmin }) => {
              setAdminStatus(isUserAdmin(u.email));
            });
          } else {
            setAdminStatus(false);
          }
          setLoading(false);
        });
      });
    });
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const handleLogout = async () => {
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('@/lib/firebase');
    await signOut(auth);
    window.location.href = '/';
  };

  if (loading) return null;

  if (user) {
    const initials = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {adminStatus && (
          <Link
            href="/admin"
            style={{
              padding: '6px 14px',
              background: 'var(--gradient-gold)',
              color: 'var(--primary)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            ⚙️ Admin
          </Link>
        )}
        <Link
          href="/dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'var(--gradient-gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary)',
          }}>
            {initials}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', fontWeight: '500' }}>
            {user.displayName?.split(' ')[0] || 'Account'}
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/auth/login" className="btn btn-ghost btn-sm">
      Login
    </Link>
  );
}

// Mobile auth buttons
function NavAuthButtonsMobile({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let unsubscribe: () => void;
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      import('@/lib/firebase').then(({ auth }) => {
        unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
      });
    });
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const handleLogout = async () => {
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('@/lib/firebase');
    await signOut(auth);
    onClose();
    window.location.href = '/';
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="btn btn-outline btn-sm"
        style={{ flex: 1, justifyContent: 'center' }}
      >
        Logout
      </button>
    );
  }

  return (
    <Link href="/auth/login" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>
      Login
    </Link>
  );
}
