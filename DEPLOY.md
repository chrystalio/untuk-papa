# Deployment Guide — Untuk Papa on Proxmox (app-01)

This guide deploys the Next.js PWA to a Proxmox LXC container running behind nginx.

## Architecture

```
Internet → Proxmox (LXC app-01:3000) → nginx (reverse proxy)
```

## Prerequisites

- Proxmox LXC container (Debian/Ubuntu) with Docker installed
- Domain/subdomain pointing to your home IP
- nginx running on the host or a separate LXC

---

## 1. Prepare the Container

SSH into your Proxmox host, then into the LXC:

```bash
pct enter <LXC-ID>
# or
ssh root@<container-ip>
```

Install Docker if not already present:

```bash
curl -fsSL https://get.docker.com | sh
```

Create app directory:

```bash
mkdir -p /opt/untuk-papa
```

---

## 2. Copy the Project

From your **local machine**, copy the project to the container:

```bash
# Using rsync (exclude node_modules, .next, and build artifacts)
rsync -avz --exclude 'node_modules' \
       --exclude '.next' \
       --exclude '.git' \
       --exclude '*.pem' \
       ./ \
       root@<container-ip>:/opt/untuk-papa/
```

Or from inside the container, clone/pull from your git repo:

```bash
cd /opt/untuk-papa
git pull origin main
npm install
npm run build
```

---

## 3. Build the Docker Image

From inside the container at `/opt/untuk-papa`:

```bash
# Build the image (use --target builder to skip builder stage manually)
docker build -t untuk-papa:latest .
```

Or build directly from the host using `git` + `docker build`:

```bash
git clone https://your-repo.git /opt/untuk-papa
docker build -t untuk-papa:latest /opt/untuk-papa
docker run -d \
  --name untuk-papa \
  -p 127.0.0.1:3000:3000 \
  --restart unless-stopped \
  untuk-papa:latest
```

---

## 4. Configure nginx (on host or another LXC)

Assuming nginx runs on the Proxmox host (`pve`):

```nginx
# /etc/nginx/sites-available/untuk-papa
server {
    listen 80;
    server_name untuk-papa.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Optional:SSL termination (uncomment after certbot)
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/untuk-papa/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/untuk-papa/privkey.pem;
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/untuk-papa /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 5. Set Up SSL (Let's Encrypt)

```bash
certbot --nginx -d untuk-papa.yourdomain.com
```

---

## 6. Update ( redeploy)

```bash
cd /opt/untuk-papa
git pull origin main
docker build -t untuk-papa:latest . --no-cache
docker stop untuk-papa && docker rm untuk-papa
docker run -d \
  --name untuk-papa \
  -p 127.0.0.1:3000:3000 \
  --restart unless-stopped \
  untuk-papa:latest
```

---

## Notes

- PWA service worker only builds for **production** (`NODE_ENV=production`). On local dev it won't register.
- The `next-pwa` plugin generates service worker files at `public/sw.js` and `public/workbox-*.js`.
- Default `next dev` uses Turbopack. Production build (`next build`) uses Webpack.
