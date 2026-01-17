# 部署指南

## VPS 部署步骤

### 1. 服务器准备

确保你的 VPS 服务器已安装以下软件：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 18+ (使用 nvm 推荐)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 安装 Nginx
sudo apt install nginx -y

# 安装 PM2
npm install -g pm2
```

### 2. 克隆项目

```bash
cd /var/www
git clone <your-repo-url> myporti
cd myporti
npm install
```

### 3. 构建项目

```bash
npm run build
```

### 4. 使用 PM2 启动

```bash
# 启动应用
pm2 start npm --name "portfolio" -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs portfolio

# 保存配置
pm2 save

# 设置开机自启
pm2 startup
```

### 5. 配置 Nginx

创建配置文件：

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

添加以下内容（替换 `your-domain.com` 为你的域名）：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. 配置 SSL (可选但推荐)

使用 Let's Encrypt 获取免费 SSL 证书：

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

证书会自动续期。

### 7. 防火墙配置

```bash
# 允许 HTTP 和 HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 8. 数据备份

定期备份数据库：

```bash
# 备份脚本
cp /var/www/myporti/data/portfolio.db /var/www/myporti/data/portfolio.db.backup.$(date +%Y%m%d)
```

可以设置 cron 任务自动备份：

```bash
crontab -e
# 添加：每天凌晨 2 点备份
0 2 * * * cp /var/www/myporti/data/portfolio.db /var/www/myporti/data/portfolio.db.backup.$(date +\%Y\%m\%d)
```

## 环境变量配置（如需要）

如果将来需要环境变量，创建 `.env.local` 文件：

```bash
cd /var/www/myporti
nano .env.local
```

## 性能优化

### 1. 启用 Gzip 压缩

在 Nginx 配置中启用 gzip：

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### 2. 设置缓存

对于静态资源，Nginx 配置已包含缓存设置。

### 3. PM2 集群模式（多核 CPU）

如果服务器有多核，可以使用集群模式：

```bash
pm2 delete portfolio
pm2 start npm --name "portfolio" -i max -- start
```

## 监控和日志

### PM2 监控

```bash
# 查看详细信息
pm2 monit

# 查看日志
pm2 logs portfolio

# 重启应用
pm2 restart portfolio

# 停止应用
pm2 stop portfolio
```

### Nginx 日志

```bash
# 访问日志
sudo tail -f /var/log/nginx/access.log

# 错误日志
sudo tail -f /var/log/nginx/error.log
```

## 故障排查

### 应用无法启动

1. 检查 Node.js 版本：`node -v` (需要 18+)
2. 检查端口占用：`sudo lsof -i :3000`
3. 查看 PM2 日志：`pm2 logs portfolio`

### Nginx 502 错误

1. 检查应用是否运行：`pm2 status`
2. 检查端口配置：确认应用监听在 3000 端口
3. 查看 Nginx 错误日志：`sudo tail -f /var/log/nginx/error.log`

### 数据库错误

1. 检查数据目录权限：`ls -la /var/www/myporti/data`
2. 确保数据目录可写：`chmod 755 /var/www/myporti/data`

## 更新应用

```bash
cd /var/www/myporti
git pull
npm install
npm run build
pm2 restart portfolio
```

## 卸载

如果需要卸载：

```bash
# 停止应用
pm2 delete portfolio

# 删除 Nginx 配置
sudo rm /etc/nginx/sites-enabled/portfolio
sudo rm /etc/nginx/sites-available/portfolio
sudo nginx -t
sudo systemctl reload nginx

# 删除项目目录（可选）
rm -rf /var/www/myporti
```

