import { sampleBlogPosts } from '@/data/sampleBlogPosts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return sampleBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = sampleBlogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | HK Realty Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = sampleBlogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = sampleBlogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', gap: '12px', marginBottom: '20px' }}>
             <span className="badge badge-gold">{post.category}</span>
             <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{post.readTime} min read</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '700', color: '#fff', marginBottom: '24px', lineHeight: '1.2' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                 {post.author.charAt(0)}
               </div>
               <div style={{ textAlign: 'left' }}>
                 <div style={{ fontWeight: '600', color: '#fff' }}>{post.author}</div>
                 <div style={{ fontSize: '0.75rem' }}>{post.publishedAt}</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <article style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text)' }}>
            {paragraphs.map((p, i) => {
              if (p.startsWith('## ')) {
                return <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary)', marginTop: '40px', marginBottom: '16px' }}>{p.replace('## ', '')}</h2>;
              }
              if (p.startsWith('- ')) {
                const items = p.split('\n').map(item => item.replace('- ', ''));
                return (
                  <ul key={i} style={{ paddingLeft: '24px', marginBottom: '24px', color: 'var(--text-light)' }}>
                    {items.map((item, idx) => {
                      if (item.includes('**')) {
                         const parts = item.split('**');
                         return <li key={idx} style={{ marginBottom: '8px' }}><strong>{parts[1]}</strong>{parts[2]}</li>;
                      }
                      return <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>;
                    })}
                  </ul>
                );
              }
              if (p.match(/^\d+\./)) {
                const items = p.split('\n');
                return (
                  <ol key={i} style={{ paddingLeft: '24px', marginBottom: '24px', color: 'var(--text-light)' }}>
                    {items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} style={{ marginBottom: '24px', color: 'var(--text-light)' }}>{p}</p>;
            })}
          </article>

          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          <div className="card" style={{ marginTop: '40px', padding: '32px', display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--bg)' }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
               {post.author.charAt(0)}
             </div>
             <div>
               <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '4px' }}>{post.author}</h3>
               <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '600', marginBottom: '12px' }}>{post.authorRole}</p>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Expert insights on real estate trends, investment opportunities, and property management.</p>
             </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '32px', textAlign: 'center' }}>Related Articles</h2>
            <div className="grid-3">
              {relatedPosts.map((rp) => (
                <Link href={`/blog/${rp.slug}`} key={rp.id} className="card" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '24px' }}>
                    <span className="badge" style={{ background: 'rgba(10,37,64,0.1)', color: 'var(--primary)', marginBottom: '12px' }}>{rp.category}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '12px', lineHeight: '1.4' }}>{rp.title}</h3>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '600' }}>Read Article →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
