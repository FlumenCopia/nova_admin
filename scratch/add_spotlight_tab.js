const fs = require('fs');
let code = fs.readFileSync('admin-ui/app/dashboard/founder/page.js', 'utf8');

// 1. Add state variables for Leadership Spotlight
const stateInsert = `
  // --- SECTION 3: LEADERSHIP SPOTLIGHT STATE ---
  const [leaderTag, setLeaderTag] = useState('LEADERSHIP SPOTLIGHT');
  const [spotlightName, setSpotlightName] = useState('GIREESH KUMAR S');
  const [spotlightRole, setSpotlightRole] = useState('Founder, Director & CEO — Nova Innovations');
  const [leaderYears, setLeaderYears] = useState('27+');
  const [leaderYearsLabel, setLeaderYearsLabel] = useState('Years Leadership');
  const [leaderBio, setLeaderBio] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('+91 9539000640');
  const [leaderFeature1Title, setLeaderFeature1Title] = useState('Visionary Direction');
  const [leaderFeature1Desc, setLeaderFeature1Desc] = useState("Building Kerala's most reliable 24/7 overnight advertising engine.");
  const [leaderFeature2Title, setLeaderFeature2Title] = useState('Enterprise Relationships');
  const [leaderFeature2Desc, setLeaderFeature2Desc] = useState('Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.');
  const [leaderImage, setLeaderImage] = useState('/heroman.jpeg');
  const [spotlightImageFile, setSpotlightImageFile] = useState(null);
  const [spotlightImagePreview, setSpotlightImagePreview] = useState(null);
  const [savingSpotlight, setSavingSpotlight] = useState(false);
  const spotlightFileInputRef = useRef(null);
`;

code = code.replace(
  '  // --- NOTIFICATION STATE ---',
  stateInsert + '\n  // --- NOTIFICATION STATE ---'
);

// 2. Add fetch logic inside fetchSettings
const fetchInsert = `
        if (d.leaderTag !== undefined) setLeaderTag(d.leaderTag || 'LEADERSHIP SPOTLIGHT');
        if (d.leaderName !== undefined) setSpotlightName(d.leaderName || 'GIREESH KUMAR S');
        if (d.leaderRole !== undefined) setSpotlightRole(d.leaderRole || 'Founder, Director & CEO — Nova Innovations');
        if (d.leaderYears !== undefined) setLeaderYears(d.leaderYears || '27+');
        if (d.leaderYearsLabel !== undefined) setLeaderYearsLabel(d.leaderYearsLabel || 'Years Leadership');
        if (d.leaderBio !== undefined) setLeaderBio(d.leaderBio || '');
        if (d.leaderPhone !== undefined) setLeaderPhone(d.leaderPhone || '+91 9539000640');
        if (d.leaderFeature1Title !== undefined) setLeaderFeature1Title(d.leaderFeature1Title || 'Visionary Direction');
        if (d.leaderFeature1Desc !== undefined) setLeaderFeature1Desc(d.leaderFeature1Desc || '');
        if (d.leaderFeature2Title !== undefined) setLeaderFeature2Title(d.leaderFeature2Title || 'Enterprise Relationships');
        if (d.leaderFeature2Desc !== undefined) setLeaderFeature2Desc(d.leaderFeature2Desc || '');
        if (d.leaderImage !== undefined) setLeaderImage(d.leaderImage || '/heroman.jpeg');
`;

code = code.replace(
  'if (d.servicesSectionDesc !== undefined) setServicesDesc(d.servicesSectionDesc || \'\');',
  'if (d.servicesSectionDesc !== undefined) setServicesDesc(d.servicesSectionDesc || \'\');\n' + fetchInsert
);

// 3. Add handleSaveSpotlight function
const saveSpotlightFunction = `
  const handleSpotlightPhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSpotlightImageFile(file);
      setSpotlightImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveSpotlight = async (e) => {
    e.preventDefault();
    setSavingSpotlight(true);

    try {
      let finalImg = leaderImage;
      if (spotlightImageFile) {
        const uploadRes = await uploadFounderImage(spotlightImageFile);
        if (uploadRes && uploadRes.success && uploadRes.imageUrl) {
          finalImg = uploadRes.imageUrl;
          setLeaderImage(finalImg);
          setSpotlightImagePreview(null);
          setSpotlightImageFile(null);
        }
      }

      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          leaderTag,
          leaderName: spotlightName,
          leaderRole: spotlightRole,
          leaderYears,
          leaderYearsLabel,
          leaderBio,
          leaderPhone,
          leaderFeature1Title,
          leaderFeature1Desc,
          leaderFeature2Title,
          leaderFeature2Desc,
          leaderImage: finalImg,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Leadership Spotlight updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update leadership spotlight');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving leadership spotlight');
    } finally {
      setSavingSpotlight(false);
    }
  };
`;

code = code.replace(
  '  // --- SERVICES HEADER SAVE ---',
  saveSpotlightFunction + '\n  // --- SERVICES HEADER SAVE ---'
);

// 4. Add Tab Button 3
const tabButton = `
        <button
          type="button"
          onClick={() => setActiveTab('spotlight')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'spotlight' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'spotlight' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>3. Leadership Spotlight</span>
        </button>
`;

code = code.replace(
  '          <span>2. Comprehensive Services Section ({servicesList.length})</span>\n        </button>',
  '          <span>2. Comprehensive Services Section ({servicesList.length})</span>\n        </button>' + tabButton
);

// 5. Add Tab 3 content JSX before the closing modal
const spotlightTabJSX = `
      {/* ========================================================================= */}
      {/* TAB 3: LEADERSHIP SPOTLIGHT */}
      {/* ========================================================================= */}
      {activeTab === 'spotlight' && (
        <div>
          {/* LIVE PREVIEW BANNER (MATCHES USER SCREENSHOT EXACTLY) */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Live Preview (Leadership Spotlight Card)
              </h3>
              <a
                href="/dashboard/leadership"
                style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}
              >
                Go to Full Leadership Page →
              </a>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                padding: '40px',
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                gap: '36px',
                alignItems: 'center',
              }}
            >
              {/* Left Column Portrait */}
              <div style={{ position: 'relative' }}>
                <div style={{ width: '260px', height: '290px', borderRadius: '20px', overflow: 'hidden', background: '#f3f4f6' }}>
                  <img
                    src={spotlightImagePreview || getMediaUrl(leaderImage) || '/heroman.jpeg'}
                    alt={spotlightName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.src = '/heroman.jpeg'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: '#dc2626',
                      color: '#ffffff',
                      padding: '8px 14px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
                    }}
                  >
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, lineHeight: 1 }}>{leaderYears}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                      {leaderYearsLabel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ color: '#dc2626', fontSize: '1.2rem' }}>••</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#dc2626', letterSpacing: '0.08em' }}>
                    {leaderTag}
                  </span>
                </div>

                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                  {spotlightName}
                </h2>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#dc2626', marginBottom: '14px' }}>
                  {spotlightRole}
                </div>

                <p style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  {leaderBio}
                </p>

                {/* Pillars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ background: '#f9fafb', padding: '12px 18px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px', border: '1px solid #f3f4f6' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>
                      🏆
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#111827' }}>{leaderFeature1Title}</div>
                      <div style={{ fontSize: '0.84rem', color: '#6b7280', marginTop: '2px' }}>{leaderFeature1Desc}</div>
                    </div>
                  </div>

                  <div style={{ background: '#f9fafb', padding: '12px 18px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px', border: '1px solid #f3f4f6' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>
                      🤝
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#111827' }}>{leaderFeature2Title}</div>
                      <div style={{ fontSize: '0.84rem', color: '#6b7280', marginTop: '2px' }}>{leaderFeature2Desc}</div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ background: '#dc2626', color: '#ffffff', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.88rem' }}>
                    📞 Call Founder: {leaderPhone}
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #d1d5db', color: '#374151', padding: '10px 20px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.88rem' }}>
                    Connect with Director →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EDIT FORM */}
          <form onSubmit={handleSaveSpotlight} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: '0 0 24px 0' }}>
              Edit Leadership Spotlight Card
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Spotlight Tagline
                </label>
                <input
                  type="text"
                  value={leaderTag}
                  onChange={(e) => setLeaderTag(e.target.value)}
                  placeholder="e.g. LEADERSHIP SPOTLIGHT"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Leader Name
                </label>
                <input
                  type="text"
                  value={spotlightName}
                  onChange={(e) => setSpotlightName(e.target.value)}
                  placeholder="e.g. GIREESH KUMAR S"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Role & Title
                </label>
                <input
                  type="text"
                  value={spotlightRole}
                  onChange={(e) => setSpotlightRole(e.target.value)}
                  placeholder="e.g. Founder, Director & CEO — Nova Innovations"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Years
                  </label>
                  <input
                    type="text"
                    value={leaderYears}
                    onChange={(e) => setLeaderYears(e.target.value)}
                    placeholder="27+"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Years Label
                  </label>
                  <input
                    type="text"
                    value={leaderYearsLabel}
                    onChange={(e) => setLeaderYearsLabel(e.target.value)}
                    placeholder="Years Leadership"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Leader Biography Paragraph
                </label>
                <textarea
                  rows={3}
                  value={leaderBio}
                  onChange={(e) => setLeaderBio(e.target.value)}
                  placeholder="Pioneering outdoor advertising, highway hoardings..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Leader Phone Number
                </label>
                <input
                  type="text"
                  value={leaderPhone}
                  onChange={(e) => setLeaderPhone(e.target.value)}
                  placeholder="+91 9539000640"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Leader Portrait Photo
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <input
                    type="file"
                    ref={spotlightFileInputRef}
                    accept="image/*"
                    onChange={handleSpotlightPhotoChange}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => spotlightFileInputRef.current && spotlightFileInputRef.current.click()}
                    style={{
                      background: '#f3f4f6',
                      border: '1px solid #d1d5db',
                      color: '#374151',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Choose Photo
                  </button>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {spotlightImageFile ? spotlightImageFile.name : 'Current photo loaded'}
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Key Pillar 1: Title
                </label>
                <input
                  type="text"
                  value={leaderFeature1Title}
                  onChange={(e) => setLeaderFeature1Title(e.target.value)}
                  placeholder="Visionary Direction"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Key Pillar 1: Description
                </label>
                <input
                  type="text"
                  value={leaderFeature1Desc}
                  onChange={(e) => setLeaderFeature1Desc(e.target.value)}
                  placeholder="Building Kerala's most reliable 24/7 overnight advertising engine."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Key Pillar 2: Title
                </label>
                <input
                  type="text"
                  value={leaderFeature2Title}
                  onChange={(e) => setLeaderFeature2Title(e.target.value)}
                  placeholder="Enterprise Relationships"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Key Pillar 2: Description
                </label>
                <input
                  type="text"
                  value={leaderFeature2Desc}
                  onChange={(e) => setLeaderFeature2Desc(e.target.value)}
                  placeholder="Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={savingSpotlight}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: savingSpotlight ? 'not-allowed' : 'pointer',
                  opacity: savingSpotlight ? 0.7 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                }}
              >
                {savingSpotlight ? 'Saving Spotlight...' : 'Save Leadership Spotlight'}
              </button>
            </div>
          </form>
        </div>
      )}
`;

code = code.replace(
  '{/* ========================================================================= */}\n      {/* SERVICE EDIT / CREATE MODAL */}',
  spotlightTabJSX + '\n      {/* ========================================================================= */}\n      {/* SERVICE EDIT / CREATE MODAL */}'
);

fs.writeFileSync('admin-ui/app/dashboard/founder/page.js', code, 'utf8');
console.log('Successfully updated founder admin page with Tab 3 Leadership Spotlight!');

