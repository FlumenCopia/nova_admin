# Nova Innovations - Hostinger Unlimited Web Hosting Deployment Guide

This guide walks you through deploying the complete Nova Innovations stack on **Hostinger Unlimited Web Hosting (with Node.js support)**.

---

## Architecture Overview

Your application consists of three modular components:
1. **`nova-group` (Public Website):** Next.js 15 marketing site + Founder portfolio (`/founder-of-nova.html`).
2. **`admin-api` (Backend & Storage):** Express.js REST API with file uploads and embedded JSON database (`data/db.json` - zero MongoDB setup required, or MongoDB Atlas if desired).
3. **`admin-ui` (CMS Dashboard):** Next.js 15 administrative dashboard to manage site content, clients, services, enquiries, and founder details.

---

## Pre-requisites in Hostinger hPanel

1. Log into your **Hostinger Account** -> go to **hPanel** (`hpanel.hostinger.com`).
2. Verify your domain `novainnovations.in` is active under **Websites**.
3. Create two subdomains for clean architecture (under **Domains** -> **Subdomains**):
   - `api.novainnovations.in` &rarr; Folder: `public_html/api`
   - `admin.novainnovations.in` &rarr; Folder: `public_html/admin`
4. Enable **Free SSL** for:
   - `novainnovations.in`
   - `api.novainnovations.in`
   - `admin.novainnovations.in`

---

## Step 1: Deploying the Backend API (`admin-api`)

Hostinger Unlimited provides built-in **Node.js Web App Management** (up to 5 web apps).

### A. Upload Files
1. In hPanel, open **File Manager** (or connect via FTP / SSH).
2. Navigate to `public_html/api/`.
3. Upload the contents of the `admin-api/` directory:
   - `src/`
   - `data/` (contains pre-populated `db.json` with all real client logos, site info, and services)
   - `uploads/` (ensure `uploads/clients/` and `uploads/portfolio/` exist)
   - `package.json` and `package-lock.json`
   - `.env.example`

### B. Configure Environment
Create a file named `.env` in `public_html/api/`:
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=nova_secret_key_prod_2026_x89a_security
# Optional: MongoDB Atlas URI. If omitted, the API automatically uses data/db.json!
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/novadb?retryWrites=true&w=majority
```

### C. Create Node.js Application in hPanel
1. In hPanel, search for **Node.js** under **Advanced** or **Web Apps**.
2. Click **Create Application**:
   - **Node.js Version:** `20.x` or `18.x`
   - **Application Root:** `/home/uXXXXX/domains/novainnovations.in/public_html/api`
   - **Application Startup File:** `src/app.js`
   - **Application Mode:** `Production`
3. Click **Create**.
4. In the Node.js application management screen, click **Run NPM Install** (or run `npm install --omit=dev` via SSH).
5. Click **Start / Restart App**.
6. Test in browser: `https://api.novainnovations.in/api/settings` - it will return your live JSON configuration!

---

## Step 2: Deploying the Public Website (`nova-group`)

There are two approaches for `nova-group` on Hostinger:

### Approach A (Recommended for Shared Hosting: Blazing-Fast Static Export)
Next.js static export serves at maximum LiteSpeed web-server speed with zero RAM usage.

1. On your local machine (or CI):
   ```bash
   cd nova-group
   npm run build
   ```
2. Upload all files from `nova-group/out` (or the static build) directly into `public_html/` of `novainnovations.in`.
3. Ensure `public/client-logos/` and `public/founder-of-nova.html` are present in `public_html/`.

### Approach B (Node.js Web App Mode)
1. In hPanel, create a 2nd Node.js Web App pointing to `public_html/` for `novainnovations.in`.
2. Startup command: `node_modules/next/dist/bin/next start` on the allocated port.

---

## Step 3: Deploying the Admin Dashboard (`admin-ui`)

1. In local `admin-ui/`:
   Create `.env.production`:
   ```env
   NEXT_PUBLIC_API_URL=https://api.novainnovations.in
   ```
2. Build the admin dashboard:
   ```bash
   cd admin-ui
   npm run build
   ```
3. In hPanel, set up a Node.js app for `admin.novainnovations.in` in `public_html/admin/` or upload the standalone export.
4. Access `https://admin.novainnovations.in` to log in and manage your site!
   - Default admin login can be seeded with: `npm run seed` in `admin-api/`.

---

## Step 4: Corporate Emails

Hostinger Unlimited includes free email hosting for your domain:
1. In hPanel, click **Emails** -> `novainnovations.in`.
2. Click **Add Email Account**:
   - `info@novainnovations.in`
   - `novainnovations2020@gmail.com` (can be forwarded)
   - `gireesh@novainnovations.in`
3. Webmail access is available at `mail.hostinger.com` or via IMAP on Outlook/mobile.

---

## Summary Checklist

| Component | Hostinger Location | Port / Routing | Status |
| :--- | :--- | :--- | :--- |
| **API Backend** | `public_html/api` | `api.novainnovations.in` | Node.js (App 1) |
| **Public Site** | `public_html/` | `novainnovations.in` | Fast Static / Node.js (App 2) |
| **Admin UI** | `public_html/admin` | `admin.novainnovations.in` | Node.js (App 3) |
| **Free SSL** | hPanel -> Security | All domains & subdomains | Active |
| **Database** | Embedded `data/db.json` | Local File (or MongoDB Atlas) | Zero-Config Ready |
