const { BlogPost } = require('../models');
const { isValidObjectId } = require('../middleware/validateObjectId');

// Authoritative default seed articles for high Google SERP & AI search rankings in Kerala OOH
const SEED_BLOG_POSTS = [
  {
    title: 'The Ultimate Guide to Outdoor Advertising in Kerala (2026 Edition)',
    slug: 'kerala-outdoor-advertising-guide-2026',
    excerpt:
      'From NH 66 6-lane highway unipoles to KSRTC transit bus wraps and prime city center gantries: discover how leading Kerala brands achieve 10x ROI with high-impact OOH advertising.',
    content: `## The Strategic Power of Outdoor Advertising in Kerala

Kerala is one of India's highest-density consumer markets, where daily commuter transit across national highways and urban corridors drives immense brand visibility. For retail giants like **myG, Bhima, and Pothys**, Out-Of-Home (OOH) media is not just brand awareness—it is the direct catalyst for store footfall.

### 1. High-Footfall Highway Unipoles on NH 66
The ongoing expansion of National Highway 66 into a six-lane expressway has created unprecedented visibility opportunities. Strategically positioned cantilever structures and dual-sided unipoles in locations like **Parippally (Kollam-Trivandrum corridor)** and **Edapally-Aluva (Ernakulam)** capture over 150,000 daily passenger impressions.

### 2. Time-Bound Transit Fleets (KSRTC & Private Buses)
Mobile transit branding delivers geographic reach that static billboards cannot replicate. Full-body wraps on fast-passenger and low-floor KSRTC buses move through city centers, district borders, and rural commercial hubs 18 hours a day, providing continuous brand saturation.

### 3. Key Factors for OOH Campaign Success:
- **Night-Time Luminescence:** Front-lit high-lumen LED floodlights ensure 24/7 round-the-clock readability.
- **Overnight Turnaround:** Emergency synchronized rollouts across multiple districts prevent phased competitor counter-moves.
- **Durable Weatherproofing:** Kerala's monsoon requires high-tensile flex and rust-inhibited steel frames.

Partnering with an established outdoor media agency like **Nova Innovations** gives brands access to 500+ prime hoarding sites and end-to-end execution across all 14 districts.`,
    coverImage: '/uploads/portfolio/parippally-25x30.jpg',
    category: 'Industry Insights',
    tags: ['Kerala OOH', 'Highway Billboards', 'NH 66', 'Nova Innovations'],
    author: 'Gireesh Kumar S',
    authorRole: 'Founder, Director & CEO — Nova Innovations',
    authorImage: '/heroman.jpeg',
    readTime: '6 min read',
    isPublished: true,
    views: 142,
    seoTitle: 'Ultimate Guide to Outdoor Advertising in Kerala (2026) | Nova Innovations',
    seoDescription: 'Master Kerala outdoor advertising: prime NH 66 highway unipoles, KSRTC transit bus branding, and high-impact billboard locations across Trivandrum, Kochi & Calicut.',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    title: 'Highway Billboards vs. Transit Advertising: Which Yields Better ROI?',
    slug: 'highway-billboards-vs-transit-advertising-roi-kerala',
    excerpt:
      'Comparing static highway unipoles with dynamic bus wraps across Kerala. Analyze CPM, reach frequency, and audience demographic targeting for retail, healthcare, and jewellery brands.',
    content: `## Choosing the Optimal Media Mix in Kerala

Media buyers frequently debate whether to concentrate marketing capital in **static landmark billboards** or **dynamic transit advertising fleets**. In a unique state like Kerala, with its contiguous urban-rural continuum, the answer lies in your brand's lifecycle and campaign objective.

### Highway Billboards: The Gold Standard for Prestige & Dominance
- **High Retention Time:** Commuters stuck in junction signals or highway traffic engage with your creative for 45 to 90 seconds.
- **Locational Permanence:** For retail showrooms, gold jewellery outlets, and medical centers, a landmark billboard functions as a geographical beacon that guides customer navigation.
- **Monumental Scale:** 30x25 ft or 40x30 ft structures establish unquestioned market leadership.

### Transit Fleet Advertising: High Frequency & Wide Geographic Dispersion
- **Dynamic Route Traversal:** A single branded bus travels 250+ kilometers daily across multiple towns and suburban clusters.
- **Low CPM (Cost Per Thousand):** In terms of raw impressions per rupee spent, public transit bus panels offer exceptional media value.
- **Youth & Commuter Footfall:** Bus stands and transit terminals deliver intense captive audience exposure.

### The Hybrid Formula: The 70/30 Strategy
Top brands like **myG** and **Oxygen Digital** consistently deploy a 70/30 hybrid strategy: 70% budget allocated to landmark city junction and highway billboards to anchor brand prestige, and 30% to mobile fleet wraps to maximize frequency.`,
    coverImage: '/uploads/portfolio/karunagappally-30x25.jpg',
    category: 'Media Strategy',
    tags: ['Media Strategy', 'ROI', 'Transit Advertising', 'Billboards'],
    author: 'Nova Innovations Media Team',
    authorRole: 'Kerala OOH Media Strategists',
    authorImage: '/heroman.jpeg',
    readTime: '5 min read',
    isPublished: true,
    views: 98,
    seoTitle: 'Highway Billboards vs Transit Advertising in Kerala | Nova Innovations',
    seoDescription: 'Compare ROI of Kerala highway unipoles vs KSRTC transit wraps. Strategic media mix guide for Kerala retail, healthcare, and real estate brands.',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
  {
    title: 'The Evolution of DOOH & 3D Billboards in Kochi and Trivandrum',
    slug: 'evolution-dooh-3d-billboards-kochi-trivandrum',
    excerpt:
      'Digital Out-Of-Home (DOOH) displays, programmatic scheduling, and anamorphic 3D architectural screens are transforming Kerala commercial centers into immersive brand arenas.',
    content: `## Kerala Enters the Era of Digital & Anamorphic OOH

The skyline of urban Kerala is witnessing a technological leap. From traditional flex hoardings to **high-refresh-rate P3/P4 LED digital screens**, Digital Out-Of-Home (DOOH) is delivering dynamic storytelling to premium shoppers.

### Why Leading Brands are Adopting DOOH in Kerala
1. **Time-of-Day Contextual Advertising:** Display breakfast retail offers in morning commuter hours and dining/entertainment creatives in the evening.
2. **Zero Flex Printing Costs:** Swap campaigns instantly via cloud CMS without re-mounting or fabrication turnaround time.
3. **Motion That Demands Attention:** Human eyes are naturally conditioned to detect motion; video billboards boast up to 2.5x higher recall rates than static prints.

### Key Hubs for DOOH in Kerala:
- **MG Road, Kochi & Marine Drive:** High-density commercial centers attracting high-net-worth professionals.
- **Panavila & Palayam, Trivandrum:** Government administrative centers and corporate transit hubs with elite footfall.
- **Calicut Mavoor Road:** The bustling commercial corridor for retail lifestyle brands.

Nova Innovations continues to invest in cutting-edge digital infrastructure, helping Kerala enterprises bridge traditional outdoor supremacy with digital agility.`,
    coverImage: '/uploads/portfolio/myg-statewide-campaign.jpg',
    category: 'Digital OOH',
    tags: ['DOOH', 'Digital Billboards', 'Kochi', 'Trivandrum', 'Nova Innovations'],
    author: 'Gireesh Kumar S',
    authorRole: 'Founder, Director & CEO — Nova Innovations',
    authorImage: '/heroman.jpeg',
    readTime: '4 min read',
    isPublished: true,
    views: 184,
    seoTitle: 'DOOH & Digital Billboards in Kochi & Trivandrum | Nova Innovations',
    seoDescription: 'Explore the rise of Digital Out-Of-Home (DOOH) and 3D architectural displays in Kochi, Trivandrum & Calicut. Next-gen outdoor advertising by Nova Innovations.',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
];

// Helper to slugify text
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 1. Get Public Blogs (Published only, with auto-seed if empty)
const getPublicBlogs = async (req, res) => {
  try {
    let count = await BlogPost.countDocuments();
    if (count === 0) {
      await BlogPost.insertMany(SEED_BLOG_POSTS);
    }

    const { category, search, tag, limit = 20, page = 1 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = new RegExp(`^${category.trim()}$`, 'i');
    }
    if (tag) {
      query.tags = { $in: [tag.trim()] };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { excerpt: { $regex: search.trim(), $options: 'i' } },
        { tags: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 50);
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (currentPage - 1) * pageSize;

    const [total, posts] = await Promise.all([
      BlogPost.countDocuments(query),
      BlogPost.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
    ]);

    // Distinct categories for filter pills
    const categories = await BlogPost.distinct('category', { isPublished: true });

    return res.status(200).json({
      success: true,
      data: posts,
      categories,
      pagination: {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Get public blogs error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving blogs.' });
  }
};

// 2. Get Single Blog by Slug (Public)
const getPublicBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Slug is required.' });
    }

    const post = await BlogPost.findOne({ slug: slug.toLowerCase().trim(), isPublished: true });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Increment view count asynchronously
    BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).exec();

    // Fetch related articles in same category
    const related = await BlogPost.find({
      _id: { $ne: post._id },
      isPublished: true,
      category: post.category,
    })
      .sort({ publishedAt: -1 })
      .limit(3);

    return res.status(200).json({
      success: true,
      data: post,
      related,
    });
  } catch (error) {
    console.error('Get blog by slug error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving blog article.' });
  }
};

// 3. Get All Blogs for Admin
const getAllBlogsAdmin = async (req, res) => {
  try {
    let count = await BlogPost.countDocuments();
    if (count === 0) {
      await BlogPost.insertMany(SEED_BLOG_POSTS);
    }

    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = new RegExp(`^${category.trim()}$`, 'i');
    }
    if (search) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { excerpt: { $regex: search.trim(), $options: 'i' } },
        { tags: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const posts = await BlogPost.find(query).sort({ createdAt: -1 });
    const categories = await BlogPost.distinct('category');

    return res.status(200).json({
      success: true,
      data: posts,
      categories,
    });
  } catch (error) {
    console.error('Get admin blogs error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving blogs.' });
  }
};

// 4. Create Blog Post (Admin)
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      author,
      authorRole,
      readTime,
      isPublished,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }
    if (!excerpt || !excerpt.trim()) {
      return res.status(400).json({ success: false, message: 'Excerpt is required.' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Article content is required.' });
    }

    let finalSlug = slug ? slugify(slug) : slugify(title);
    if (!finalSlug) finalSlug = `article-${Date.now()}`;

    // Ensure slug uniqueness
    const existing = await BlogPost.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Process uploaded file if handled by upload middleware
    const finalCover = req.processedImageUrl || coverImage || '/mainhero1.png';

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Kerala OOH', 'Nova Innovations'];

    const newPost = await BlogPost.create({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content,
      coverImage: finalCover,
      category: category ? category.trim() : 'Outdoor Advertising',
      tags: parsedTags,
      author: author ? author.trim() : 'Nova Innovations Media Team',
      authorRole: authorRole ? authorRole.trim() : 'Kerala OOH Media Strategists',
      readTime: readTime ? readTime.trim() : '5 min read',
      isPublished: isPublished === true || isPublished === 'true',
      seoTitle: seoTitle ? seoTitle.trim() : title.trim(),
      seoDescription: seoDescription ? seoDescription.trim() : excerpt.trim(),
      publishedAt: (isPublished === true || isPublished === 'true') ? new Date() : null,
    });

    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully!',
      data: newPost,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to create blog post.' });
  }
};

// 5. Update Blog Post (Admin)
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid blog post ID.' });
    }

    const existing = await BlogPost.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      author,
      authorRole,
      readTime,
      isPublished,
      seoTitle,
      seoDescription,
    } = req.body;

    let finalSlug = existing.slug;
    if (slug && slugify(slug) !== existing.slug) {
      finalSlug = slugify(slug);
      const duplicate = await BlogPost.findOne({ slug: finalSlug, _id: { $ne: id } });
      if (duplicate) {
        finalSlug = `${finalSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      }
    }

    const finalCover = req.processedImageUrl || coverImage || existing.coverImage;

    const parsedTags = tags !== undefined
      ? (Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [])
      : existing.tags;

    const publishedBool = isPublished !== undefined ? (isPublished === true || isPublished === 'true') : existing.isPublished;

    existing.title = title !== undefined ? title.trim() : existing.title;
    existing.slug = finalSlug;
    existing.excerpt = excerpt !== undefined ? excerpt.trim() : existing.excerpt;
    existing.content = content !== undefined ? content : existing.content;
    existing.coverImage = finalCover;
    existing.category = category !== undefined ? category.trim() : existing.category;
    existing.tags = parsedTags;
    existing.author = author !== undefined ? author.trim() : existing.author;
    existing.authorRole = authorRole !== undefined ? authorRole.trim() : existing.authorRole;
    existing.readTime = readTime !== undefined ? readTime.trim() : existing.readTime;
    existing.isPublished = publishedBool;
    existing.seoTitle = seoTitle !== undefined ? seoTitle.trim() : existing.seoTitle;
    existing.seoDescription = seoDescription !== undefined ? seoDescription.trim() : existing.seoDescription;

    if (!existing.publishedAt && publishedBool) {
      existing.publishedAt = new Date();
    }

    await existing.save();

    return res.status(200).json({
      success: true,
      message: 'Blog post updated successfully!',
      data: existing,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to update blog post.' });
  }
};

// 6. Delete Blog Post (Admin)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid blog post ID.' });
    }

    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully.',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete blog post.' });
  }
};

module.exports = {
  getPublicBlogs,
  getPublicBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
};
