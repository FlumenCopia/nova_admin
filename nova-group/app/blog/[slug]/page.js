import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, MessageCircle, ChevronRight } from 'lucide-react';

async function getPost(slug) {
  try {
    const apiHost = process.env.NEXT_PUBLIC_API_URL || 'https://api.novainnovations.in/api';
    const res = await fetch(`${apiHost}/public/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json && json.success ? json : null;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data || !data.data) {
    return {
      title: 'Article Not Found | Nova Innovations Blog',
    };
  }

  const post = data.data;
  const title = post.seoTitle || `${post.title} | Nova Innovations Kerala`;
  const description = post.seoDescription || post.excerpt;
  const canonicalUrl = `https://novainnovations.in/blog/${post.slug}`;
  const ogImage = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `https://novainnovations.in${post.coverImage || '/mainhero1.png'}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Nova Innovations',
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author || 'Gireesh Kumar S'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data || !data.data) {
    notFound();
  }

  const post = data.data;
  const related = data.related || [];
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  const shareText = encodeURIComponent(`Read "${post.title}" on Nova Innovations: https://novainnovations.in/blog/${post.slug}`);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  // Article Schema.org JSON-LD for Google & AI search engines
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [
      post.coverImage?.startsWith('http')
        ? post.coverImage
        : `https://novainnovations.in${post.coverImage || '/mainhero1.png'}`,
    ],
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Gireesh Kumar S',
      jobTitle: post.authorRole || 'Founder, Director & CEO',
      url: 'https://gireeshkumar.novainnovations.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nova Innovations',
      logo: {
        '@type': 'ImageObject',
        url: 'https://novainnovations.in/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://novainnovations.in/blog/${post.slug}`,
    },
  };

  // Convert markdown-like content to simple HTML paragraphs & headings
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} style={{ height: '14px' }} />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              marginTop: '28px',
              marginBottom: '12px',
              color: 'var(--text-main, #0f172a)',
            }}
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              marginTop: '36px',
              marginBottom: '14px',
              color: 'var(--text-main, #0f172a)',
            }}
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <li
            key={idx}
            style={{
              marginLeft: '24px',
              marginBottom: '8px',
              lineHeight: 1.7,
              color: 'var(--text-secondary, #334155)',
            }}
          >
            {trimmed.replace('- ', '')}
          </li>
        );
      }

      // Basic bold parsing: **text**
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p
          key={idx}
          style={{
            lineHeight: 1.8,
            fontSize: '1.05rem',
            color: 'var(--text-secondary, #334155)',
            marginBottom: '16px',
          }}
        >
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} style={{ color: 'var(--text-main, #0f172a)' }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ARTICLE HEADER / BREADCRUMBS */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '36px 0 24px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px' }}>
          <nav className="breadcrumbs" style={{ marginBottom: '16px', display: 'flex', gap: '8px', fontSize: '0.84rem', color: '#64748b' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: '#64748b', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span style={{ color: 'var(--brand-red, #e51b24)', fontWeight: 600 }}>{post.category}</span>
          </nav>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'var(--brand-red, #e51b24)',
                color: '#ffffff',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {post.category || 'Industry Insights'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: '#64748b' }}>
              <Calendar size={14} /> {publishedDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: '#64748b' }}>
              <Clock size={14} /> {post.readTime || '5 min read'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--text-main, #0f172a)',
              marginBottom: '20px',
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '24px',
              fontStyle: 'italic',
            }}
          >
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '16px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#e2e8f0',
                  border: '2px solid #ffffff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src="/heroman.jpeg"
                  alt={post.author}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text-main, #0f172a)' }}>
                  {post.author || 'Gireesh Kumar S'}
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {post.authorRole || 'Founder & CEO — Nova Innovations'}
                </span>
              </div>
            </div>

            {/* WhatsApp Share */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={15} />
              Share on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="container" style={{ maxWidth: '860px', margin: '40px auto 60px', padding: '0 20px' }}>
        {/* Featured Cover Image */}
        {post.coverImage && (
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '36px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
              background: '#0f172a',
              maxHeight: '460px',
            }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: '100%', height: 'auto', maxHeight: '460px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="article-body-typography">
          {renderFormattedContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginRight: '10px' }}>TAGS:</span>
            <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    background: '#f1f5f9',
                    color: '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '40px' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--brand-red, #e51b24)',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.92rem',
            }}
          >
            <ArrowLeft size={16} /> Back to all OOH articles
          </Link>
        </div>

        {/* INLINE ADVISORY / BOOKING CTA */}
        <div
          style={{
            marginTop: '50px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '36px',
            color: '#ffffff',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <span style={{ color: 'var(--brand-red, #e51b24)', fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.06em' }}>
            EXECUTIVE OOH MEDIA DESK
          </span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
            Planning a Billboard Campaign in Kerala?
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
            Nova Innovations operates over 500+ prime highway hoardings, KSRTC transit bus wraps, and city center gantries. Get exact GPS coordinates, night illumination photos, and current rate cards directly from our media planners.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
            <a
              href="https://wa.me/919539000640?text=Hi%20Nova%20Innovations%2C%20I%20would%20like%20to%20inquire%20about%20billboard%20sites%20in%20Kerala."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MessageCircle size={16} />
              Inquire on WhatsApp
            </a>
            <a
              href="tel:+919539000640"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              Call: +91 95390 00640
            </a>
          </div>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', color: 'var(--text-main, #0f172a)' }}>
              Related Insights & Case Studies
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '18px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--brand-red, #e51b24)', fontWeight: 700 }}>
                      {rel.category}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '8px 0', lineHeight: 1.4 }}>
                      {rel.title}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                    Read Article <ChevronRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
