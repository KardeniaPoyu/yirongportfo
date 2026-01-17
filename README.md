# 作品集展示网站

一个现代化的个人项目作品集展示网站，专为信息与计算科学专业学生设计，展示计算机图形学、流体仿真、自动驾驶、游戏开发和AI等领域的项目。

## 功能特性

- 🎨 **现代化设计** - 采用渐变色彩和玻璃态效果，符合计算机图形学领域的审美
- 📱 **响应式布局** - 完美适配桌面、平板和移动设备
- 🖼️ **多媒体支持** - 支持图片和视频预览
- 💻 **代码展示** - 支持多语言代码高亮显示
- 📄 **项目文档** - 完整的项目文档管理
- 🏷️ **分类标签** - 按领域分类展示项目
- ✏️ **便捷管理** - 简单的后台管理系统，轻松添加和编辑作品

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **数据库**: SQLite (better-sqlite3)
- **代码高亮**: react-syntax-highlighter
- **图标**: Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 生产构建

```bash
npm run build
npm start
```

## 项目结构

```
├── app/                  # Next.js App Router 页面
│   ├── api/             # API 路由
│   ├── admin/           # 管理页面
│   ├── projects/        # 项目详情页面
│   └── page.tsx         # 首页
├── components/          # React 组件
│   ├── Header.tsx       # 网站头部
│   ├── ProjectCard.tsx  # 项目卡片
│   ├── ProjectDetail.tsx # 项目详情
│   └── ProjectForm.tsx  # 项目表单
├── lib/                 # 工具函数和数据库
│   ├── db.ts           # 数据库连接
│   ├── projects.ts     # 项目数据操作
│   └── types.ts        # TypeScript 类型定义
└── public/             # 静态资源
```

## 部署到 VPS

### 1. 服务器准备

确保服务器已安装 Node.js 18+ 和 npm。

### 2. 克隆项目

```bash
git clone <your-repo-url>
cd MyPorti
npm install
```

### 3. 构建项目

```bash
npm run build
```

### 4. 使用 PM2 管理进程

```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

### 5. 配置 Nginx

创建 Nginx 配置文件 `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL 证书 (可选但推荐)

使用 Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 使用说明

### 添加作品

1. 访问 `/admin` 页面
2. 点击"添加作品"按钮
3. 填写项目信息：
   - 标题和描述
   - 选择分类
   - 添加技术栈
   - 上传封面图片 URL
   - 添加媒体文件（图片/视频）
   - 添加代码文件
   - 添加项目文档
4. 点击"保存"

### 编辑作品

在管理页面，点击作品卡片上的"编辑"按钮进行修改。

### 删除作品

在管理页面，点击作品卡片上的"删除"按钮。

## 数据存储

项目数据存储在 `data/portfolio.db` SQLite 数据库中。数据库文件会自动创建。

## 注意事项

- 当前版本使用 URL 方式引用图片和视频，未来可以扩展为本地文件上传
- 建议定期备份 `data/` 目录
- 生产环境建议启用 HTTPS

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

