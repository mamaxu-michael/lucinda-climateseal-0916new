// API密钥配置文件
// 注意：在生产环境中，这些密钥应该通过环境变量提供

export const API_KEYS = {
  // Anthropic API密钥
  ANTHROPIC_API_KEY: 'sk-ZmvMRoZwcfH75NH9H8yaXxA1kgde7thek5KgFpUsL38SMRPR',
  
  // Anthropic API基础URL
  ANTHROPIC_BASE_URL: 'https://code.ppchat.vip',
  
  // 其他API密钥可以在这里添加
  // RESEND_API_KEY: process.env.RESEND_API_KEY,
  // EMAIL_HOST: process.env.EMAIL_HOST,
  // EMAIL_USER: process.env.EMAIL_USER,
  // EMAIL_PASS: process.env.EMAIL_PASS,
};

// 获取Anthropic API密钥的函数
export function getAnthropicApiKey() {
  // 优先使用环境变量，如果没有则使用配置文件中的值
  return process.env.ANTHROPIC_API_KEY || API_KEYS.ANTHROPIC_API_KEY;
}

// 验证API密钥是否有效的函数
export function validateAnthropicApiKey() {
  const apiKey = getAnthropicApiKey();
  return apiKey && apiKey.length > 0;
}

// 获取Anthropic API基础URL的函数
export function getAnthropicBaseURL() {
  return process.env.ANTHROPIC_BASE_URL || API_KEYS.ANTHROPIC_BASE_URL;
}
