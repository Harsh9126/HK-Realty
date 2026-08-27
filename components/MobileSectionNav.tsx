'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface MobileNavItem {
  href: string;
  label: string;
  icon?: string;
}

interface MobileSectionNavProps {
  title: string;
  items: MobileNavItem[];
}

export default function MobileSectionNav({ title, items }: MobileSectionNavProps) {
  const pathname = usePathname();

  return (
    <div
      className="show-mobile"
      style={{
        width: '100%',
        background: 'var(--primary)',
        padding: '12px 16px',
        flexDirection: 'column',
        gap: '10px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: '64px',
        zIndex: 90,
      }}
    >
      <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>
        {title} Menu
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: isActive ? '700' : '500',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                background: isActive ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.1)',
                color: isActive ? 'var(--primary)' : '#fff',
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.2s ease',
              }}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
