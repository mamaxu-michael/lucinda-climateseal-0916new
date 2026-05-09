# Climate Seal Analytics 生产环境部署指南

## 🎯 部署概览

你现在有一个完整的网站分析系统，需要将其部署到生产环境。

## 📋 第一阶段：验证当前功能（推荐先完成）

### 1. 完整功能测试
在部署到生产环境之前，请先在本地完整测试：

```bash
# 确保两个服务都在运行
http://localhost:3000      # Next.js 网站
http://localhost:3001      # Analytics 服务器
```

**测试步骤**：
1. **主网站测试** - 访问 http://localhost:3000
   - 浏览所有页面：首页 → 应用场景 → 产品 → 定价 → 关于 → 联系
   - 在每个页面停留至少 30 秒
   - 滚动浏览页面内容
   - 点击导航链接和CTA按钮
   
2. **表单提交测试**
   - 填写并提交联系表单（可用测试数据）
   
3. **等待5分钟**，让心跳数据积累

4. **查看分析结果**
   - 访问 http://localhost:3000/results.html
   - 点击"加载最新数据"
   - 验证能看到多个主题页面数据

### 2. 预期测试结果
完成测试后，你应该看到：
- ✅ 5-8个不同的主题页面（home, scenarios-value, products, etc.）
- ✅ 非零的停留时间数据 (avgTimeSpent > 0)
- ✅ 滚动深度数据 (avgScrollDepth > 0)
- ✅ 点击交互数据 (totalClicks > 0)
- ✅ 表单提交转化数据

---

## 🚀 第二阶段：生产环境部署

### 方案A：云服务器部署（推荐）

#### 1. 服务器准备
```bash
# 推荐配置
- 云服务器：AWS EC2, 阿里云ECS, 腾讯云CVM等
- 配置：2核4G内存，40G存储
- 系统：Ubuntu 20.04 LTS
- 端口：80(HTTP), 443(HTTPS), 3001(Analytics API)
```

#### 2. 环境安装
```bash
# SSH连接服务器后执行
sudo apt update
sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx sqlite3

# 安装 PM2（进程管理）
sudo npm install -g pm2
```

#### 3. 代码部署
```bash
# 1. 上传代码到服务器
scp -r /Users/xuguangma/Desktop/website-0808-08-20 user@server:/var/www/
scp -r /Users/xuguangma/Desktop/climate-seal-analytics user@server:/var/www/

# 2. 安装依赖
cd /var/www/website-0808-08-20 && npm install
cd /var/www/climate-seal-analytics/server && npm install

# 3. 构建生产版本
cd /var/www/website-0808-08-20 && npm run build
```

#### 4. 配置修改
需要修改以下配置：

**网站配置** (`/var/www/website-0808-08-20/src/app/layout.tsx`):
```javascript
window.CLIMATE_ANALYTICS_CONFIG = {
  apiEndpoint: 'https://your-domain.com/api/track',  // 改为你的域名
  batchSize: 5,
  heartbeatInterval: 15000,
  debug: false  // 生产环境关闭调试
};
```

**Nginx配置** (`/etc/nginx/sites-available/climate-seal`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 网站静态文件
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Analytics API
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

#### 5. 启动服务
```bash
# 启动 Analytics 服务器
cd /var/www/climate-seal-analytics/server
pm2 start server.js --name "climate-analytics"

# 启动 Next.js 网站
cd /var/www/website-0808-08-20
pm2 start npm --name "climate-website" -- start

# 启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 设置 PM2 开机自启
pm2 startup
pm2 save
```

#### 6. SSL证书配置
```bash
# 申请 Let's Encrypt 免费证书
sudo certbot --nginx -d your-domain.com
```

### 方案B：Docker容器部署

如果你熟悉Docker，可以使用容器化部署：

```dockerfile
# 创建 Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  website:
    build: ./website-0808-08-20
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      
  analytics:
    build: ./climate-seal-analytics/server
    ports:
      - "3001:3001"
    volumes:
      - ./data:/app/data
```

---

## ⚙️ 第三阶段：生产环境优化

### 1. 数据库优化
```sql
-- 添加索引提升查询性能
CREATE INDEX idx_theme_timestamp ON theme_page_views(page_theme, timestamp);
CREATE INDEX idx_session_timestamp ON page_views(session_id, timestamp);
```

### 2. 监控和备份
```bash
# 定期备份数据库
crontab -e
# 添加：每天凌晨2点备份
0 2 * * * cp /var/www/climate-seal-analytics/server/analytics.db /backup/analytics_$(date +\%Y\%m\%d).db
```

### 3. 性能监控
```bash
# 监控服务器资源
sudo apt install htop iotop

# 监控PM2进程
pm2 monit
```

---

## 📊 第四阶段：数据分析使用

### 1. 日常数据查看
访问你的网站：
- `https://your-domain.com/results.html` - 分析结果
- `https://your-domain.com/api/analytics/climate/themes?period=7d` - 7天数据

### 2. 定期优化决策
基于数据进行网站优化：
- **高跳出率页面** - 优先优化
- **低停留时间页面** - 改善内容
- **低转化率页面** - 优化CTA和表单

### 3. 导出报告
```bash
# 定期导出分析报告
curl "https://your-domain.com/api/analytics/summary?period=30d" > monthly_report.json
```

---

## ✅ 生产环境检查清单

### 部署前检查
- [ ] 本地功能完整测试通过
- [ ] 服务器环境准备完成
- [ ] 域名DNS配置完成
- [ ] SSL证书申请完成

### 部署后检查
- [ ] 网站可正常访问
- [ ] Analytics API正常工作
- [ ] 数据正确收集和存储
- [ ] 分析仪表板可正常显示
- [ ] 服务器监控配置完成

### 数据验证
- [ ] 主题页面识别正确
- [ ] 停留时间数据准确
- [ ] 点击和转化数据正常
- [ ] 优化建议功能可用

---

## 🎯 总结

**你现在需要做的**：

1. **立即行动**：先完成第一阶段的本地完整测试
2. **确认效果**：验证能看到完整的主题页面分析数据
3. **准备部署**：选择云服务器或容器化方案
4. **逐步上线**：按照部署指南步骤执行

**预期效果**：
- 完整的Climate Seal网站主题页面分析系统
- 每个页面的详细停留时间和用户行为数据  
- 基于数据的优化决策支持
- 实时监控网站性能和用户体验

**现在就开始第一阶段的完整测试吧！** 🚀