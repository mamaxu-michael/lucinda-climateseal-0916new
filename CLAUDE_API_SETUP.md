# Anthropic API 集成设置指南

## 概述

本项目已成功集成了Anthropic API，允许您使用Claude AI服务。API密钥已更新为：`MEKY4Z67-9PBQTK`，基础URL为：`https://gaccode.com`

## 文件结构

```
├── config/
│   └── api-keys.js          # API密钥配置文件
├── src/app/api/claude/
│   └── route.ts             # Claude API端点
├── src/app/claude-test/
│   └── page.tsx             # 测试页面
└── CLAUDE_API_SETUP.md      # 本说明文档
```

## 配置说明

### 1. API密钥配置

API密钥存储在 `config/api-keys.js` 文件中：

```javascript
export const API_KEYS = {
  ANTHROPIC_API_KEY: 'MEKY4Z67-9PBQTK',
  ANTHROPIC_BASE_URL: 'https://gaccode.com',
};
```

### 2. 环境变量（推荐）

为了安全起见，建议将API密钥设置为环境变量：

```bash
# 在 .env.local 文件中
ANTHROPIC_API_KEY=MEKY4Z67-9PBQTK
ANTHROPIC_BASE_URL=https://gaccode.com
```

如果设置了环境变量，系统会优先使用环境变量中的值。

## 使用方法

### 1. 测试页面

访问 `/claude-test` 页面来测试API集成：

- 设置系统提示词（可选）
- 输入您的问题
- 点击"发送消息"按钮
- 查看AI响应

### 2. API调用

您也可以直接调用API端点：

```javascript
const response = await fetch('/api/claude', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: '您的问题',
    systemPrompt: '系统提示词（可选）',
  }),
});

const data = await response.json();
```

## API响应格式

成功响应：
```json
{
  "success": true,
  "response": "AI的回答内容",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 50
  }
}
```

错误响应：
```json
{
  "error": "错误描述",
  "details": "详细错误信息（仅开发环境）"
}
```

## 安全注意事项

1. **不要将API密钥提交到版本控制系统**
2. **在生产环境中使用环境变量**
3. **定期轮换API密钥**
4. **监控API使用量和费用**

## 故障排除

### 常见问题

1. **"Claude API密钥未配置"错误**
   - 检查 `config/api-keys.js` 文件
   - 确认环境变量设置正确

2. **"AI服务暂时不可用"错误**
   - 检查网络连接
   - 验证API密钥是否有效
   - 查看服务器日志

3. **响应缓慢**
   - Claude API可能需要几秒钟响应
   - 检查网络延迟

### 调试模式

在开发环境中，错误响应会包含详细的错误信息。在生产环境中，这些信息会被隐藏以保护安全。

## 更新日志

- **2024-08-22**: 初始集成，API密钥更新为 `MEKY4Z67-9PBQTK`，基础URL更新为 `https://gaccode.com`
- 创建了测试页面和API端点
- 添加了完整的错误处理和安全措施

## 支持

如果您遇到问题或需要帮助，请：

1. 检查本说明文档
2. 查看浏览器控制台的错误信息
3. 检查服务器日志
4. 联系技术支持团队

---

**注意**: 请妥善保管您的API密钥，不要与他人分享。
