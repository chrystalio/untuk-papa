# Deployment Guide — Untuk Papa on Proxmox + Portainer

This guide deploys the Next.js PWA to a Proxmox LXC container using Portainer for container management.

## Architecture

```
Internet → Proxmox Host → LXC (Portainer Agent) → Docker Container (:3000)
```

---

## 1. Prepare the Container

SSH into your Proxmox host and create/get into the LXC:

```bash
pct enter <LXC-ID>
```

Install Docker:

```bash
curl -fsSL https://get.docker.com | sh
```

Create app directory:

```bash
mkdir -p /opt/untuk-papa
```

---

## 2. Build via Portainer

Since you're using Portainer, the easiest workflow is:

### Option A — Build from source on the LXC

1. Push code to git
2. In Portainer → **Containers** → **Stacks** or **Images**
3. Or SSH into LXC and clone:

```bash
cd /opt/untuk-papa
git clone https://your-repo.git .
docker build -t untuk-papa:latest .
```

### Option B — Use Portainer Web Editor (Quick Deploy)

1. Open Portainer → **Stacks** → **Add stack**
2. Paste this `docker-compose.yml` directly:

```yaml
version: "3.8"
services:
  app:
    build: .
    container_name: untuk-papa
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
```

3. Click **Deploy the stack**

---

## 3. Reverse Proxy (nginx on Proxmox Host)

On the Proxmox host (not inside the LXC):

```bash
apt install nginx certbot python3-certbot-nginx
```

```nginx
# /etc/nginx/sites-available/untuk-papa
server {
    listen 80;
    server_name untuk-papa.yourdomain.com;

    location / {
        proxy_pass http://<LXC-IP>:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/untuk-papa /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 4. SSL

```bash
certbot --nginx -d untuk-papa.yourdomain.com
```

---

## 5. Update / Redeploy via Portainer

1. Push code changes to git
2. SSH into LXC:

```bash
cd /opt/untuk-papa && git pull origin main
docker build -t untuk-papa:latest . --no-cache
docker stop untuk-papa && docker rm untuk-papa
docker run -d --name untuk-papa -p 3000:3000 --restart unless-stopped untuk-papa:latest
```

Or in Portainer: **Stacks → pilih stack → Editor → re-deploy**.

---

## Notes

- PWA service worker only registers in **production** (`NODE_ENV=production`).
- The container runs as non-root user `nextjs` (uid 1001).
- `next.config.ts` has `output: "standalone"` — required for Docker.
