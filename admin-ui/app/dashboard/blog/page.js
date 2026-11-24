'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import Modal from '../../../components/Modal';
import { apiRequest, getMediaUrl, PUBLIC_SITE_URL } from '../../../lib/api';

const DEFAULT_CATEGORIES = [
  'Industry Insights',
  'Media Strategy',
  'Digital OOH',
  'Highway Corridors',
  'Transit Advertising',
  'Retail Branding',
];

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Industry Insights',
    tags: 'Kerala OOH, Nova Innovations, Billboards',
    author: 'Nova Innovations Media Team',
    authorRole: 'Kerala OOH Media Strategists',
    readTime: '5 min read',
    coverImage: '/mainhero1.png',
    isPublished: true,
    seoTitle: '',
    seoDescription: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await apiRequest('/admin/blogs');
      if (res && res.success) {
        setBlogs(res.data || []);
        if (Array.isArray(res.categories) && res.categories.length > 0) {
          const merged = Array.from(new Set([...DEFAULT_CATEGORIES, ...res.categories]));
          setCategoriesList(merged);
        }
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Slug auto-generator
  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setFormData((prev) => {
      const autoSlug = titleVal
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return {
        ...prev,
        title: titleVal,
        slug: editingId ? prev.slug : autoSlug,
        seoTitle: editingId ? prev.seoTitle : titleVal,
      };
    });
  };

  const handleOpenModal = (post = null) => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (post) {
      setEditingId(post._id || post.id);
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category || 'Industry Insights',
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
        author: post.author || 'Nova Innovations Media Team',
        authorRole: post.authorRole || 'Kerala OOH Media Strategists',
        readTime: post.readTime || '5 min read',
        coverImage: post.coverImage || '/mainhero1.png',
        isPublished: post.isPublished !== false,
        seoTitle: post.seoTitle || post.title || '',
        seoDescription: post.seoDescription || post.excerpt || '',
      });
      setPreviewUrl(getMediaUrl(post.coverImage, '/mainhero1.png'));
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Industry Insights',
        tags: 'Kerala OOH, Nova Innovations, Billboards',
        author: 'Nova Innovations Media Team',
        authorRole: 'Kerala OOH Media Strategists',
        readTime: '5 min read',
        coverImage: '/mainhero1.png',
        isPublished: true,
        seoTitle: '',
        seoDescription: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('slug', formData.slug);
      formPayload.append('excerpt', formData.excerpt);
      formPayload.append('content', formData.content);
      formPayload.append('category', formData.category);
      formPayload.append('tags', formData.tags);
      formPayload.append('author', formData.author);
      formPayload.append('authorRole', formData.authorRole);
      formPayload.append('readTime', formData.readTime);
      formPayload.append('isPublished', String(formData.isPublished));
      formPayload.append('seoTitle', formData.seoTitle);
      formPayload.append('seoDescription', formData.seoDescription);

      if (selectedFile) {
        formPayload.append('image', selectedFile);
      } else {
        formPayload.append('coverImage', formData.coverImage);
      }

      const endpoint = editingId ? `/admin/blogs/${editingId}` : '/admin/blogs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await apiRequest(endpoint, {
        method,
        body: formPayload,
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg(editingId ? 'Article updated successfully!' : 'Article published successfully!');
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        throw new Error(res.message || 'Failed to save article.');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving article.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete article "${title}"?`)) return;
    try {
      const res = await apiRequest(`/admin/blogs/${id}`, { method: 'DELETE' });
      if (res && res.success) {
        setToastType('success');
        setToastMsg('Article deleted.');
        fetchBlogs();
      } else {
        throw new Error(res.message || 'Failed to delete');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to delete article.');
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      const newStatus = !post.isPublished;
      const res = await apiRequest(`/admin/blogs/${post._id || post.id}`, {
        method: 'PUT',
        body: JSON.stringify({ isPublished: newStatus }),
      });
      if (res && res.success) {
        setToastType('success');
        setToastMsg(`Article ${newStatus ? 'Published' : 'Hidden as Draft'}.`);
        fetchBlogs();
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Failed to update status.');
    }
  };

  // Filtered blogs
  const filteredBlogs = blogs.filter((b) => {
    if (categoryFilter !== 'all' && b.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      return (
        b.title?.toLowerCase().includes(term) ||
        b.excerpt?.toLowerCase().includes(term) ||
        b.slug?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
  const publishedCount = blogs.filter((b) => b.isPublished !== false).length;
  const draftCount = blogs.length - publishedCount;

  return (
    <>
      <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />

      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Blog & Article CMS</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage Kerala outdoor advertising guides, strategic OOH insights, and SEO thought-leadership articles.
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', gap: '10px' }}>
          <a
            href={`${PUBLIC_SITE_URL}/blog`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>View Live Blog</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>+ Write New Article</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>TOTAL ARTICLES</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: 'var(--color-text-primary)' }}>
            {blogs.length}
          </div>
        </div>
        <div className="card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>PUBLISHED LIVE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#16a34a' }}>
            {publishedCount}
          </div>
        </div>
        <div className="card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 600 }}>DRAFTS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#ea580c' }}>
            {draftCount}
          </div>
        </div>
        <div className="card" style={{ padding: '18px 20px' }}>
          <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>TOTAL ARTICLE VIEWS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#0284c7' }}>
            {totalViews.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="card" style={{ padding: '16px', marginBottom: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Search articles by title, excerpt, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ minWidth: '180px' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
          >
            <option value="all">All Categories ({blogs.length})</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading articles...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>No articles found</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
            No articles match your search criteria. Create a new article to get started.
          </p>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            + Write First Article
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
          {filteredBlogs.map((post) => {
            const coverSrc = getMediaUrl(post.coverImage, '/mainhero1.png');
            const postId = post._id || post.id;

            return (
              <div
                key={postId}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '14px',
                  boxShadow: 'var(--shadow-sm)',
                  opacity: post.isPublished !== false ? 1 : 0.75,
                }}
              >
                {/* Cover Image */}
                <div style={{ position: 'relative', height: '170px', background: '#e2e8f0' }}>
                  <img
                    src={coverSrc}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = '/mainhero1.png';
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: post.isPublished !== false ? '#16a34a' : '#64748b',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {post.isPublished !== false ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(0,0,0,0.72)',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {post.category || 'Article'}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                      <span>{post.readTime || '5 min read'}</span>
                      <span>👁️ {post.views || 0} views</span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                      {post.title}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '14px' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      className="btn-secondary"
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: post.isPublished !== false ? '#475569' : '#16a34a',
                        borderColor: post.isPublished !== false ? '#cbd5e1' : '#16a34a',
                      }}
                      onClick={() => handleTogglePublish(post)}
                    >
                      {post.isPublished !== false ? 'Hide (Draft)' : 'Publish'}
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                      onClick={() => handleOpenModal(post)}
                    >
                      Edit
                    </button>
                    <a
                      href={`${PUBLIC_SITE_URL}/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                      title="View Public Post"
                    >
                      ↗
                    </a>
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.82rem', color: '#dc2626', borderColor: '#fca5a5' }}
                      onClick={() => handleDelete(postId, post.title)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Article Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Blog Article' : 'Write New Blog Article'}
        maxWidth="850px"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. The Strategic Power of Outdoor Advertising on NH 66"
              className="input-field"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.92rem' }}
            />
          </div>

          {/* Slug & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                URL Slug (Permanent Link) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. strategic-power-nh66-advertising"
                className="input-field"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
              />
              <span style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '4px', display: 'block' }}>
                Public URL: {PUBLIC_SITE_URL}/blog/{formData.slug || 'slug'}
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="input-field"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              Summary / Excerpt (SERP Preview & Cards) *
            </label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A concise 2-3 sentence teaser that captures readers and appears in Google search snippets..."
              className="input-field"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem', resize: 'vertical' }}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              Cover Image (Upload or select)
            </label>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={() => fileInputRef.current?.click()}
                style={{ padding: '8px 16px', fontSize: '0.86rem' }}
              >
                Choose Image File
              </button>
              {previewUrl && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>Image Selected</span>
                </div>
              )}
            </div>
          </div>

          {/* Content (Markdown / Full text) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              Article Body (Markdown Supported) *
            </label>
            <textarea
              required
              rows={10}
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your article body here. Markdown syntax (## Headings, **bold**, - bullet points) is fully supported."
              className="input-field"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem', fontFamily: 'monospace', resize: 'vertical' }}
            />
          </div>

          {/* Author & Read Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                className="input-field"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.86rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                Author Role
              </label>
              <input
                type="text"
                value={formData.authorRole}
                onChange={(e) => setFormData((prev) => ({ ...prev, authorRole: e.target.value }))}
                className="input-field"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.86rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                placeholder="e.g. 5 min read"
                className="input-field"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.86rem' }}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="e.g. Kerala OOH, NH 66, DOOH, myG, Highway Unipoles"
              className="input-field"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.86rem' }}
            />
          </div>

          {/* Publish Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="isPublished" style={{ fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
              Publish immediately on public website ({PUBLIC_SITE_URL}/blog)
            </label>
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={submitting}
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ padding: '10px 24px', fontSize: '0.88rem' }}
            >
              {submitting ? 'Saving Article...' : editingId ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
