# Deployment Guide for Hostinger

This guide covers deploying this application to Hostinger. The method depends on whether you are using **Managed/Cloud Hosting (Shared)** or a **VPS**.

## Option 1: Managed Hosting (Cloud/Shared) with Node.js Support

Hostinger's "Web Hosting" and "Cloud Hosting" plans support Node.js applications.

### 1. Build Locally
First, verify your application builds correctly on your machine.
```bash
npm install
npm run build
```
This will create a `dist` directory containing your server code (`index.cjs`) and frontend assets (`public/`).

### 2. Prepare Files for Upload
You need to upload the following to your server. It is recommended to zip them for faster upload:
- `dist/` (The entire directory)
- `package.json`
- `package-lock.json`
- `vite.config.ts` (Optional, but good for reference)

### 3. Upload to Hostinger
1.  Log in to your **hPanel**.
2.  Go to **Websites** and manage your site.
3.  Open **File Manager**.
4.  Navigate to `public_html`.
5.  Create a folder for your app (e.g., `web-app`) or place files directly in `public_html` if this is the only thing on the domain.
6.  Upload and extract your files.
    *   Structure should look like:
        ```
        /public_html
          /dist
             index.cjs
             /public
          package.json
        ```

### 4. Configure Node.js Application
1.  In hPanel, search for **Node.js** (under Advanced).
2.  **Create Application**:
    *   **Node.js Version**: Select **18** or **20** (Recommended).
    *   **Application Mode**: Production.
    *   **Application Root**: The path to your folder (e.g., `public_html` or `public_html/web-app`).
    *   **Application Startup File**: `dist/index.cjs`
        *   *Note*: Ensure this path points exactly to the built server file.
3.  Click **Create**.

### 5. Install Dependencies
1.  Once created, click the **NPM Install** button in the Node.js settings.
    *   *Troubleshooting*: If the button fails, you may need to SSH into your account and run `npm install --omit=dev` inside your application root.

### 6. Environment Variables
1.  In the Node.js settings section, find **Environment Variables**.
2.  Add the variables required for LiveKit:
    *   `LIVEKIT_URL`: Your LiveKit WebSocket URL.
    *   `LIVEKIT_API_KEY`: Your LiveKit API Key.
    *   `LIVEKIT_API_SECRET`: Your LiveKit API Secret.
    *   `PORT`: (Optional, Hostinger usually handles this, but you can set it if needed).

### 7. Start the App
1.  Click **Restart** or **Start** in the Node.js settings.
2.  Visit your URL.

---

## Option 2: VPS Hosting (Ubuntu/Debian)

If you have a customized VPS.

### 1. Setup Server
Connect via SSH:
```bash
ssh root@your_vps_ip
```

Install Node.js (Version 20):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Deploy Code
Clone your repository:
```bash
git clone <your-repo-url> /var/www/curiousant
cd /var/www/curiousant
```

### 3. Install & Build
```bash
npm install
npm run build
```

### 4. Setup Process Manager (PM2)
```bash
npm install -g pm2
pm2 start dist/index.cjs --name "curiousant"
pm2 save
pm2 startup
```

### 5. Configure Nginx (Reverse Proxy)
Install Nginx:
```bash
sudo apt install nginx
```

Edit config (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; # Default port is 5000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Restart Nginx:
```bash
sudo systemctl restart nginx
```
