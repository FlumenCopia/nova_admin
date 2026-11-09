const fs = require('fs');

function updateHtmlNavbar(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Replace header navigation
  const oldHeaderStart = '<header class="site-header" id="navbar">';
  const oldHeaderEnd = '</header>';

  const hStart = html.indexOf(oldHeaderStart);
  if (hStart === -1) {
    console.log('Header start not found in', filePath);
    return;
  }
  const hEnd = html.indexOf(oldHeaderEnd, hStart);
  if (hEnd === -1) {
    console.log('Header end not found in', filePath);
    return;
  }

  const newHeader = `<header class="site-header" id="navbar">
    <!-- Logo -->
    <a href="/" class="brand-logo" id="brand-logo" style="display: flex; align-items: center;">
      <img src="logo.png" alt="Innovations" class="site-brand-logo" style="height: 38px; width: auto; object-fit: contain;">
    </a>

    <!-- Navigation Links -->
    <nav class="nav-menu" id="nav-menu">
      <a href="/" class="nav-link">Home</a>
      <a href="/about" class="nav-link">About Us</a>
      <a href="/founder-of-nova" class="nav-link active">Founder</a>
      <a href="/services" class="nav-link">Services</a>
      <a href="/gallery" class="nav-link">Campaign Gallery</a>
      <a href="/contact" class="nav-link">Contact</a>
    </nav>

    <!-- Right Action Button & Mobile Toggle -->
    <div class="nav-actions">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Theme">
        <i class="fa-solid fa-moon"></i>
      </button>
      <button class="btn nav-book-btn" onclick="openContactModal('Outdoor Hoardings')" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(220, 38, 38, 0.08); color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.2); padding: 8px 18px; border-radius: 9999px; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: all 0.2s ease;">
        <i class="fa-solid fa-phone"></i>
        <span>Book Hoarding</span>
      </button>
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle Navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>`;

  html = html.substring(0, hStart) + newHeader + html.substring(hEnd + oldHeaderEnd.length);

  // Replace mobile drawer
  const dStart = html.indexOf('<div class="mobile-drawer" id="mobile-drawer">');
  const dEnd = html.indexOf('</div>\r\n\r\n  <!-- MAIN CONTENT -->', dStart) !== -1
    ? html.indexOf('</div>\r\n\r\n  <!-- MAIN CONTENT -->', dStart)
    : html.indexOf('</div>\n\n  <!-- MAIN CONTENT -->', dStart);

  if (dStart !== -1 && dEnd !== -1) {
    const newDrawer = `<div class="mobile-drawer" id="mobile-drawer">
    <div class="drawer-header">
      <a href="/" style="display: inline-block;">
        <img src="logo.png" alt="Innovations" style="height: 32px; width: auto; object-fit: contain;">
      </a>
      <button class="drawer-close" id="drawer-close" aria-label="Close Menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-links">
      <a href="/" class="drawer-link"><i class="fa-solid fa-house"></i> Home</a>
      <a href="/about" class="drawer-link"><i class="fa-solid fa-circle-info"></i> About Us</a>
      <a href="/founder-of-nova" class="drawer-link active"><i class="fa-solid fa-user-tie"></i> Founder</a>
      <a href="/services" class="drawer-link"><i class="fa-solid fa-layer-group"></i> Services</a>
      <a href="/gallery" class="drawer-link"><i class="fa-solid fa-images"></i> Campaign Gallery</a>
      <a href="/contact" class="drawer-link"><i class="fa-solid fa-envelope"></i> Contact</a>
    </div>
    <div class="drawer-footer">
      <a href="https://wa.me/919539000640" target="_blank" class="btn btn-whatsapp btn-block drawer-btn">
        <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
      </a>
    </div>
  </div>`;

    html = html.substring(0, dStart) + newDrawer + html.substring(dEnd + 6);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully updated navbar in', filePath);
}

updateHtmlNavbar('founder-of-nova.html');
updateHtmlNavbar('nova-group/public/founder-of-nova.html');

