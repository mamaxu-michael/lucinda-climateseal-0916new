# Stripe支付集成设置指南

## 第一步：获取Stripe密钥

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/register)
2. 注册/登录你的账号
3. 在左侧导航栏点击 "开发者" → "API密钥"
4. 复制以下密钥：
   - **可发布密钥** (pk_test_...)
   - **秘密密钥** (sk_test_...)

## 第二步：配置环境变量

打开项目根目录的 `.env.local` 文件，替换为你的真实密钥：

```env
# 替换为你的真实Stripe密钥
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...

# 应用URL（部署时需要修改）
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 第三步：测试支付

### 测试信用卡号码：
- **成功支付**: 4242 4242 4242 4242
- **失败支付**: 4000 0000 0000 0002
- **需要验证**: 4000 0025 0000 3155

### 任意未来日期和任意3位CVC

## 第四步：Webhook设置（可选）

1. 在Stripe Dashboard中点击 "开发者" → "Webhooks"
2. 点击 "添加端点"
3. 端点URL: `https://yourdomain.com/api/stripe/webhook`
4. 选择事件: `payment_intent.succeeded`

## 支付流程

1. 用户选择Stripe支付方式
2. 填写信用卡信息
3. 系统创建支付意图(Payment Intent)
4. Stripe处理支付
5. 支付成功后跳转到成功页面

## 已集成的功能

✅ 真实Stripe支付处理  
✅ 支付成功/失败处理  
✅ 发票信息收集  
✅ 客户信息管理  
✅ 支付状态跟踪  
✅ 安全的API密钥管理  

## 生产环境部署

部署到生产环境时：
1. 将测试密钥替换为实际密钥 (pk_live_... 和 sk_live_...)
2. 更新 `NEXT_PUBLIC_APP_URL` 为实际域名
3. 设置Webhook端点为实际URL

现在你的支付页面已经可以处理真实的Stripe支付了！