# Solution Resources - 市场团队使用指南

## 📝 概述
这是一个静态的内容管理系统，允许市场团队通过编辑JSON文件来发布和管理文章，无需复杂的后端系统。

## 🗂️ 文件结构
```
src/
├── data/
│   └── articles.json          # 文章数据配置文件
├── app/
│   └── resources/
│       ├── page.tsx          # 资源中心主页
│       └── [id]/
│           └── page.tsx      # 文章详情页
public/
└── images/
    └── articles/             # 文章封面图片目录
```

## 📋 添加新文章步骤

### 1. 准备封面图片
- 将封面图片上传到 `/public/images/articles/` 目录
- 推荐尺寸：800x600px 或 16:9 比例
- 支持格式：JPG, PNG, WebP
- 文件名示例：`new-article-cover.jpg`

### 2. 编辑文章数据
编辑 `/src/data/articles.json` 文件，在 `articles` 数组中添加新对象：

```json
{
  "id": "unique-article-id",
  "title": "English Title",
  "titleZh": "中文标题",
  "coverImage": "/images/articles/your-cover-image.jpg",
  "excerpt": "English excerpt...",
  "excerptZh": "中文摘要...",
  "content": "Full English article content...",
  "contentZh": "完整的中文文章内容...",
  "publishDate": "2024-12-20",
  "category": "technology",
  "categoryZh": "技术",
  "featured": false
}
```

### 3. 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识符，用于URL路径 |
| `title` | string | ✅ | 英文标题 |
| `titleZh` | string | ✅ | 中文标题 |
| `coverImage` | string | ✅ | 封面图片路径 |
| `excerpt` | string | ✅ | 英文摘要（显示在卡片上） |
| `excerptZh` | string | ✅ | 中文摘要 |
| `content` | string | ✅ | 英文完整内容 |
| `contentZh` | string | ✅ | 中文完整内容 |
| `publishDate` | string | ✅ | 发布日期 (YYYY-MM-DD格式) |
| `category` | string | ✅ | 英文分类ID |
| `categoryZh` | string | ✅ | 中文分类名称 |
| `featured` | boolean | ✅ | 是否为推荐文章 |

### 4. 可用分类
- `getting-started` / `入门指南`
- `technology` / `技术`
- `supply-chain` / `供应链`  
- `compliance` / `合规`

### 5. 部署更新
完成编辑后，需要重新部署网站使更改生效。

## 📝 内容编写建议

### 标题
- 简洁明了，吸引读者
- 长度控制在50字符以内
- 中英文标题语义一致

### 摘要
- 100-150字符为佳
- 概括文章核心价值
- 激发读者兴趣

### 正文
- 支持换行（使用\n）
- 建议1000-3000字
- 结构清晰，逻辑性强
- 可包含具体案例和数据

### 分类选择
- 根据文章主题选择合适分类
- 保持分类平衡，避免某个分类文章过多

## 🎨 最佳实践

### 封面图片
- 高质量，专业性
- 与文章主题相关
- 避免版权问题

### 发布频率
- 建议每周1-2篇
- 保持内容新鲜度
- 关注热点话题

### SEO优化
- 标题包含关键词
- 摘要描述准确
- 内容原创性强

## 🚀 示例文章

参考 `articles.json` 中的示例文章：
- `sample-article-1`: 入门指南类型
- `sample-article-2`: 技术解读类型
- `sample-article-3`: 最佳实践类型

## 📞 技术支持

如遇到技术问题，请联系开发团队：
- 文件编辑问题
- 图片上传问题
- 部署相关问题

---

**注意**: 每次修改后都需要重新部署才能生效。建议在测试环境先验证内容格式正确性。