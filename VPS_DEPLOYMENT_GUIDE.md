# Nova Innovations - Production VPS Deployment Guide

**Target Server:** Hostinger KVM 2 VPS  
**Operating System:** Ubuntu 24.04 LTS with CloudPanel  
**Server IP:** `89.116.121.25`  
**Domain:** `novainnovations.in`

---

## 1. CloudPanel Site Configuration

### Site A: Public Website & API (`novainnovations.in`)
1. Log into your CloudPanel Dashboard: `https://89.116.121.25:8443`
2. Click **Add Site** &rarr; select **Reverse Proxy Site**:
   * **Domain Name:** `novainnovations.in` (and check `www.novainnovations.in`)
   * **Reverse Proxy URL:** `http://127.0.0.1:3000`
3. Click on the site &rarr; go to the **SSL/TLS** tab &rarr; click **New Let's Encrypt Certificate** &rarr; Install.
4. Go to the **Vhost** tab in CloudPanel and insert the contents from [`nginx-cloudpanel.conf`](./nginx-cloudpanel.conf) (Site 1 block) so that:
   * `/` routes to `http://127.0.0.1:3000` (`nova-group` public website)
   * `/api/` routes to `http://127.0.0.1:5000/api/` (`admin-api` backend)
   * `/uploads/` routes to `http://127.0.0.1:5000/uploads/` (static images/videos)
   * `client_max_body_size 50M;` allows high-resolution banner uploads.

### Site B: Admin CMS Dashboard (`admin.novainnovations.in`)
1. Click **Add Site** &rarr; select **Reverse Proxy Site**:
   * **Domain Name:** `admin.novainnovations.in`
   * **Reverse Proxy URL:** `http://127.0.0.1:3001`
2. Click on the site &rarr; go to the **SSL/TLS** tab &rarr; install Let's Encrypt Certificate.

---

## 2. DNS Settings (Domain Registrar)

In the domain control panel where `novainnovations.in` was registered:

| Record Type | Host / Name | Value / Destination | Purpose |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | **`89.116.121.25`** | Points your website to the VPS |
| **A Record** | `www` | **`89.116.121.25`** | Points www to the VPS |
| **A Record** | `admin` | **`89.116.121.25`** | Points admin subdomain to the VPS |
| **MX Record** | `@` | *(Keep existing / mail)* | Keeps your corporate email working |

---

## 3. Server Deployment via SSH

Connect to your VPS:
```bash
ssh root@89.116.121.25
```

### Step A: Clone & Install Dependencies
```bash
# Navigate to your web directory
cd /home/<cloudpanel-user>/htdocs/novainnovations.in

# Clone or pull your repository
git pull origin main

# Install PM2 globally if not installed
npm install -g pm2

# Install dependencies for all apps
npm --prefix admin-api install
npm --prefix nova-group install
npm --prefix admin-ui install

# Build the Next.js apps
npm --prefix nova-group run build
npm --prefix admin-ui run build
```

### Step B: Configure Environment
Copy `.env.example` in `admin-api`:
```bash
cp admin-api/.env.example admin-api/.env
```
Ensure your MongoDB connection string (e.g. MongoDB Atlas M0 free tier URI) and JWT secret are set.

### Step C: Seed Real WordPress Data
Run the automated seeder to import all 34 client logos and hoarding portfolio sites into MongoDB:
```bash
npm --prefix admin-api run seed:real
```

### Step D: Start Everything with PM2
Launch all 3 services (`nova-api`, `nova-web`, `nova-admin`) in one command:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 4. Useful Maintenance Commands

```bash
# Check running services
pm2 status

# View live logs
pm2 logs

# Restart all services after code updates
pm2 restart all
```

---

## 5. Client Hosting & Pricing Strategy

With 8 active client websites on this VPS:
* **Basic Hosting + SSL:** Charge ₹4,000 - ₹5,000 / year per client.
* **Hosting + Maintenance (AMC):** Charge ₹7,000 - ₹10,000 / year per client.
* **Annual Revenue:** ₹35,000 - ₹60,000+
* **Net Profit:** ~₹25,000 - ₹45,000/year profit while hosting Nova Innovations for **₹0**!

