const fs = require('fs');

let code = fs.readFileSync('admin-ui/app/dashboard/founder/page.js', 'utf8');

// 1. Add state for partners
if (!code.includes('const [partnersTitle, setPartnersTitle] = useState')) {
  code = code.replace(
    '  // --- SECTION 3: LEADERSHIP SPOTLIGHT STATE ---',
    `  // --- SECTION 4: CLIENT & PARTNER LOGOS STATE ---
  const [partnersTitle, setPartnersTitle] = useState('OUR ESTEEMED CLIENTS & BRAND PARTNERS');
  const [savingPartnersTitle, setSavingPartnersTitle] = useState(false);
  const [clientsList, setClientsList] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);

  // --- SECTION 3: LEADERSHIP SPOTLIGHT STATE ---`
  );
}

// 2. Add fetchClients inside fetchSettings or useEffect
if (!code.includes('const fetchClients = async')) {
  code = code.replace(
    '  const fetchServices = async () => {',
    `  const fetchClients = async () => {
    setLoadingClients(true);
    try {
      const res = await apiRequest('/admin/clients');
      if (res && res.success) {
        setClientsList(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load clients:', err);
    } finally {
      setLoadingClients(false);
    }
  };

  const fetchServices = async () => {`
  );

  code = code.replace(
    '    fetchServices();',
    '    fetchServices();\n    fetchClients();'
  );

  code = code.replace(
    'if (d.servicesSectionDesc !== undefined) setServicesDesc(d.servicesSectionDesc || \'\');',
    `if (d.servicesSectionDesc !== undefined) setServicesDesc(d.servicesSectionDesc || '');
        if (d.partnersSectionTitle !== undefined) setPartnersTitle(d.partnersSectionTitle || 'OUR ESTEEMED CLIENTS & BRAND PARTNERS');`
  );
}

// 3. Add handleSavePartnersTitle
if (!code.includes('const handleSavePartnersTitle = async')) {
  code = code.replace(
    '  // --- SERVICES HEADER SAVE ---',
    `  const handleSavePartnersTitle = async (e) => {
    e.preventDefault();
    setSavingPartnersTitle(true);
    try {
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({ partnersSectionTitle: partnersTitle }),
      });
      if (res.success) {
        setToastType('success');
        setToastMsg('Marquee section title updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update title');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Error saving title');
    } finally {
      setSavingPartnersTitle(false);
    }
  };

  // --- SERVICES HEADER SAVE ---`
  );
}

// 4. Update the Tab Bar buttons to include all 4 tabs
const tabsBarReplacement = `      {/* SECTION TABS */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', marginBottom: '28px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          style={{
            padding: '12px 18px',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'hero' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'hero' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          1. Hero &amp; Founder Profile
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          style={{
            padding: '12px 18px',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'services' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'services' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          2. Services Section ({servicesList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('spotlight')}
          style={{
            padding: '12px 18px',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'spotlight' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'spotlight' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          3. Leadership Spotlight
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('partners')}
          style={{
            padding: '12px 18px',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'partners' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'partners' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          4. Client &amp; Partner Logos ({clientsList.length})
        </button>
      </div>`;

code = code.replace(
  /\s*{\/\* SECTION TABS \*\/}[\s\S]*?<\/div>\s*{\/\* ========================================================================= \*\/\s*{\/\* TAB 1: HERO SECTION \*\/}/,
  '\n' + tabsBarReplacement + '\n\n      {/* ========================================================================= */}\n      {/* TAB 1: HERO SECTION */}'
);

// 5. Add Tab 4 JSX (Partners)
const tab4JSX = `
      {/* ========================================================================= */}
      {/* TAB 4: CLIENT & PARTNER LOGOS */}
      {/* ========================================================================= */}
      {activeTab === 'partners' && (
        <div>
          {/* TITLE EDITOR */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '28px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Client &amp; Partner Marquee Settings
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6b7280', margin: '4px 0 0 0' }}>
                  Manage the marquee track title and corporate client logos shown on <code>/founder-of-nova.html#partners</code>.
                </p>
              </div>

              <a
                href="/dashboard/clients"
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                }}
              >
                + Manage &amp; Upload Logos ({clientsList.length})
              </a>
            </div>

            <form onSubmit={handleSavePartnersTitle} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Marquee Header Title
                </label>
                <input
                  type="text"
                  value={partnersTitle}
                  onChange={(e) => setPartnersTitle(e.target.value)}
                  placeholder="e.g. OUR ESTEEMED CLIENTS & BRAND PARTNERS"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={savingPartnersTitle}
                style={{
                  background: '#111827',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: savingPartnersTitle ? 'not-allowed' : 'pointer',
                }}
              >
                {savingPartnersTitle ? 'Saving Title...' : 'Save Marquee Title'}
              </button>
            </form>
          </div>

          {/* LOGOS GRID PREVIEW */}
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Live Partner Logos in Marquee ({clientsList.length})
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>
              These logos scroll infinitely in the marquee on the founder landing page
            </span>
          </div>

          {loadingClients ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', background: '#ffffff', borderRadius: '16px' }}>
              Loading partner logos...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
              {clientsList.map((client) => {
                const src = client.logoUrl.startsWith('/uploads/')
                  ? getMediaUrl(client.logoUrl)
                  : client.logoUrl;
                return (
                  <div
                    key={client.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid #e5e7eb',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      height: '110px',
                    }}
                  >
                    <img
                      src={src}
                      alt={client.name}
                      style={{ maxHeight: '48px', maxWidth: '120px', objectFit: 'contain' }}
                      onError={(e) => { e.target.src = '/logo.png'; }}
                    />
                    <span style={{ fontSize: '0.74rem', color: '#6b7280', fontWeight: 600, marginTop: '8px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                      {client.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
`;

code = code.replace(
  '{/* ========================================================================= */}\n      {/* SERVICE EDIT / CREATE MODAL */}',
  tab4JSX + '\n      {/* ========================================================================= */}\n      {/* SERVICE EDIT / CREATE MODAL */}'
);

fs.writeFileSync('admin-ui/app/dashboard/founder/page.js', code, 'utf8');
console.log('Successfully added Tab 4 Client & Partner Logos to founder admin page!');

