import Link from 'next/link';
import { sampleBlogPosts } from '@/data/sampleBlogPosts';

export const metadata = {
  title: 'HK Realty Blog',
  description: 'Latest real estate news, investment insights, and property tips from HK Realty.',
};

export default function BlogPage() {
  const featuredPosts = sampleBlogPosts.filter((p) => p.featured);
  const allPosts = sampleBlogPosts;

  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Our Insights</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>HK Realty Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Latest real estate news, investment insights, and property tips to help you make informed decisions.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '32px' }}>Featured Insights</h2>
          <div className="grid-2">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}>
                <div style={{ height: '240px', background: 'var(--gradient-primary)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '3rem', opacity: 0.5 }}>📰</div>
                  </div>
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '16px', left: '16px' }}>{post.category}</span>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '12px', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6', flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '16px', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{post.author}</span>
                    <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>Read Article →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '32px' }}>All Articles</h2>
          <div className="grid-3">
            {allPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ height: '180px', background: 'linear-gradient(135deg, #1a3a5c 0%, #2a4a6c 100%)', position: 'relative' }}>
                   <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>📝</div>
                  </div>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--primary)', position: 'absolute', top: '12px', left: '12px' }}>{post.category}</span>
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.5', flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{post.publishedAt}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '60px 0', background: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="card-premium" style={{ padding: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '12px' }}>Subscribe to Our Newsletter</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Get the latest market insights, investment opportunities, and property trends delivered to your inbox.</p>
            <div style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto' }}>
              <input type="email" placeholder="Your email address" className="form-input" style={{ flex: 1 }} />
              <button className="btn btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
