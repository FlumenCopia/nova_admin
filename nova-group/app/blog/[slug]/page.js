import ClientBlogPost from './ClientBlogPost';

function getApiEndpoint(slug) {
  const rawHost = process.env.NEXT_PUBLIC_API_URL || 'https://api.novainnovations.in';
  const cleanHost = rawHost.replace(/\/+$/, '');
  const apiBase = cleanHost.endsWith('/api') ? cleanHost : `${cleanHost}/api`;
  return `${apiBase}/public/blogs/${slug}`;
}

async function getPost(slug) {
  try {
    const url = getApiEndpoint(slug);
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json && json.success ? json : null;
  } catch (error) {
    console.error(`Failed to fetch blog post [${slug}]:`, error.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data || !data.data) {
    return {
      title: 'Outdoor Advertising Guide | Nova Innovations Blog Kerala',
      description: 'Explore high-impact billboard advertising strategies, highway unipole networks, and transit fleet branding insights across Kerala with Nova Innovations.',
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

  const initialPost = data?.data || null;
  const initialRelated = data?.related || [];

  return (
    <ClientBlogPost
      slug={slug}
      initialPost={initialPost}
      initialRelated={initialRelated}
    />
  );
}
